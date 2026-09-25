// server.js
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var require_db = __commonJS({
  "config/db.js"(exports2, module2) {
    var mongoose = require("mongoose");
    async function connectDB2() {
      let uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ci360";
      uri = uri.trim();
      if (uri.startsWith("mongodb:mongodb+srv://")) {
        uri = uri.replace("mongodb:mongodb+srv://", "mongodb+srv://");
      }
      try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5e3 });
        console.log("\u2705 MongoDB connected successfully:", mongoose.connection.host);
      } catch (err) {
        console.error("\u274C MongoDB Connection Error:", err.message);
        console.error("--------------------------------------------------");
        console.error("Please check your MONGO_URI in backend/.env file:");
        console.error("1. Verify your MongoDB username & password in MONGO_URI.");
        console.error("2. Make sure your IP address (0.0.0.0/0) is whitelisted in MongoDB Atlas Network Access.");
        console.error("3. If using local MongoDB, ensure the service is running on 127.0.0.1:27017.");
        console.error("--------------------------------------------------");
      }
    }
    module2.exports = connectDB2;
  }
});
var require_User = __commonJS({
  "models/User.js"(exports2, module2) {
    var mongoose = require("mongoose");
    var UserSchema = new mongoose.Schema({
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      passwordHash: { type: String, required: true },
      role: { type: String, enum: ["superadmin", "employee", "client"], required: true },
      // Link an employee login to their Personnel record
      personnelId: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", default: null },
      // Link a client login to their Client record
      clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", default: null },
      active: { type: Boolean, default: true }
    }, { timestamps: true });
    module2.exports = mongoose.model("User", UserSchema);
  }
});
var require_auth = __commonJS({
  "middleware/auth.js"(exports2, module2) {
    var jwt = require("jsonwebtoken");
    var User = require_User();
    async function verifyToken(req, res, next) {
      try {
        const header = req.headers.authorization || "";
        const token = header.startsWith("Bearer ") ? header.slice(7) : null;
        if (!token) return res.status(401).json({ error: "No token provided" });
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id);
        if (!user || !user.active) return res.status(401).json({ error: "Invalid or inactive account" });
        req.user = user;
        next();
      } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
    }
    function requireRole(...roles) {
      return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
          return res.status(403).json({ error: "You do not have permission to do that" });
        }
        next();
      };
    }
    module2.exports = { verifyToken, requireRole };
  }
});
var require_auth2 = __commonJS({
  "routes/auth.js"(exports2, module2) {
    var express2 = require("express");
    var mongoose = require("mongoose");
    var bcrypt = require("bcryptjs");
    var jwt = require("jsonwebtoken");
    var User = require_User();
    var { verifyToken } = require_auth();
    var router = express2.Router();
    function signToken(user) {
      return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "12h" });
    }
    function publicUser(user) {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        personnelId: user.personnelId,
        clientId: user.clientId
      };
    }
    router.post("/login", async (req, res) => {
      if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
          error: "Database connection failed. Please check your MONGO_URI in backend/.env (verify username, password, and IP whitelist in MongoDB Atlas)."
        });
      }
      try {
        const { email, username, identifier, password } = req.body;
        const inputStr = (email || username || identifier || "").trim();
        if (!inputStr || !password) {
          return res.status(400).json({ error: "Username/Email and password are required" });
        }
        const lowerInput = inputStr.toLowerCase();
        const slugInput = lowerInput.replace(/[^a-z0-9]/g, "");
        const user = await User.findOne({
          $or: [
            { email: lowerInput },
            { email: `${slugInput}@ci360.local` },
            { name: new RegExp(`^${inputStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") }
          ]
        });
        if (!user || !user.active) {
          return res.status(401).json({ error: "Invalid username/email or password" });
        }
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) {
          return res.status(401).json({ error: "Invalid username/email or password" });
        }
        const token = signToken(user);
        res.json({ token, user: publicUser(user) });
      } catch (err) {
        res.status(500).json({ error: "Login failed", detail: err.message });
      }
    });
    router.post("/reset-password", async (req, res) => {
      if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
          error: "Database connection failed. Please check your database connection."
        });
      }
      try {
        const { email, username, identifier, newPassword } = req.body;
        const inputStr = (email || username || identifier || "").trim();
        if (!inputStr || !newPassword) {
          return res.status(400).json({ error: "Username or email and new password are required" });
        }
        if (newPassword.length < 6) {
          return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }
        const lowerInput = inputStr.toLowerCase();
        const slugInput = lowerInput.replace(/[^a-z0-9]/g, "");
        const user = await User.findOne({
          $or: [
            { email: lowerInput },
            { email: `${slugInput}@ci360.local` },
            { name: new RegExp(`^${inputStr.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") }
          ]
        });
        if (!user || !user.active) {
          return res.status(404).json({ error: "No active account found for this username or email." });
        }
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.json({
          ok: true,
          message: "Password reset successfully! You can now log in with your new password.",
          email: user.email,
          name: user.name
        });
      } catch (err) {
        res.status(500).json({ error: "Failed to reset password", detail: err.message });
      }
    });
    router.get("/me", verifyToken, async (req, res) => {
      res.json({ user: publicUser(req.user) });
    });
    module2.exports = router;
  }
});
var require_users = __commonJS({
  "routes/users.js"(exports2, module2) {
    var express2 = require("express");
    var bcrypt = require("bcryptjs");
    var User = require_User();
    var { verifyToken, requireRole } = require_auth();
    var router = express2.Router();
    router.use(verifyToken, requireRole("superadmin"));
    router.get("/", async (req, res) => {
      const users = await User.find().select("-passwordHash").populate("personnelId", "name").populate("clientId", "name").sort("name");
      res.json(users);
    });
    router.post("/", async (req, res) => {
      try {
        const { name, email, password, role, personnelId, clientId } = req.body;
        if (!name || !email || !password || !role) return res.status(400).json({ error: "name, email, password and role are required" });
        if (!["superadmin", "employee", "client"].includes(role)) return res.status(400).json({ error: "Invalid role" });
        const existing = await User.findOne({ email: email.toLowerCase().trim() });
        if (existing) return res.status(400).json({ error: "A user with that email already exists" });
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({
          name,
          email: email.toLowerCase().trim(),
          passwordHash,
          role,
          personnelId: role === "employee" ? personnelId || null : null,
          clientId: role === "client" ? clientId || null : null
        });
        const clean = user.toObject();
        delete clean.passwordHash;
        res.status(201).json(clean);
      } catch (err) {
        res.status(500).json({ error: "Could not create user", detail: err.message });
      }
    });
    router.put("/:id", async (req, res) => {
      try {
        const { name, email, password, role, personnelId, clientId, active } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        if (name != null) user.name = name;
        if (email != null) user.email = email.toLowerCase().trim();
        if (role != null) user.role = role;
        if (personnelId !== void 0) user.personnelId = role === "employee" || user.role === "employee" ? personnelId : null;
        if (clientId !== void 0) user.clientId = role === "client" || user.role === "client" ? clientId : null;
        if (active != null) user.active = active;
        if (password) user.passwordHash = await bcrypt.hash(password, 10);
        await user.save();
        const clean = user.toObject();
        delete clean.passwordHash;
        res.json(clean);
      } catch (err) {
        res.status(500).json({ error: "Could not update user", detail: err.message });
      }
    });
    router.delete("/:id", async (req, res) => {
      await User.findByIdAndDelete(req.params.id);
      res.json({ ok: true });
    });
    module2.exports = router;
  }
});
var require_Personnel = __commonJS({
  "models/Personnel.js"(exports2, module2) {
    var mongoose = require("mongoose");
    var PersonnelSchema = new mongoose.Schema({
      name: { type: String, required: true, trim: true },
      duties: { type: String, default: "" },
      capacity: { type: Number, default: 48 },
      status: { type: String, enum: ["active", "work from home", "wfh", "on leave", "pn leave"], default: "active" },
      attachments: [{
        name: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: Number, default: 0 },
        type: { type: String, default: "" },
        category: { type: String, default: "Document" },
        uploadedAt: { type: Date, default: Date.now }
      }]
    }, { timestamps: true });
    module2.exports = mongoose.model("Personnel", PersonnelSchema);
  }
});
var require_personnel = __commonJS({
  "routes/personnel.js"(exports2, module2) {
    var express2 = require("express");
    var Personnel = require_Personnel();
    var { verifyToken, requireRole } = require_auth();
    var router = express2.Router();
    router.use(verifyToken);
    router.get("/", async (req, res) => {
      const list = await Personnel.find().sort("name");
      res.json(list);
    });
    router.post("/", requireRole("superadmin"), async (req, res) => {
      const { name, duties, capacity, status, attachments } = req.body;
      if (!name) return res.status(400).json({ error: "Name is required" });
      const p = await Personnel.create({
        name,
        duties,
        capacity,
        status,
        attachments: (attachments || []).map(att => ({
          name: att.name,
          url: att.url,
          size: Number(att.size) || 0,
          type: att.type || "",
          category: att.category || "Document",
          uploadedAt: att.uploadedAt || new Date()
        }))
      });
      res.status(201).json(p);
    });
    router.put("/:id", requireRole("superadmin"), async (req, res) => {
      try {
        const p = await Personnel.findById(req.params.id);
        if (!p) return res.status(404).json({ error: "Not found" });
        const { name, duties, capacity, status, attachments } = req.body;
        if (name !== void 0) p.name = name;
        if (duties !== void 0) p.duties = duties;
        if (capacity !== void 0) p.capacity = capacity;
        if (status !== void 0) p.status = status;
        if (attachments !== void 0) p.attachments = attachments;
        await p.save();
        res.json(p);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
    router.post("/:id/attachments", requireRole("superadmin"), async (req, res) => {
      try {
        const p = await Personnel.findById(req.params.id);
        if (!p) return res.status(404).json({ error: "Personnel not found" });
        const { name, url, size, type, category } = req.body;
        if (!name || !url) return res.status(400).json({ error: "Attachment name and URL are required" });
        p.attachments.push({
          name,
          url,
          size: Number(size) || 0,
          type: type || "",
          category: category || "Document",
          uploadedAt: new Date()
        });
        await p.save();
        res.json(p);
      } catch (err) {
        res.status(500).json({ error: "Could not add attachment", detail: err.message });
      }
    });
    router.delete("/:id", requireRole("superadmin"), async (req, res) => {
      await Personnel.findByIdAndDelete(req.params.id);
      res.json({ ok: true });
    });
    module2.exports = router;
  }
});
var require_Client = __commonJS({
  "models/Client.js"(exports2, module2) {
    var mongoose = require("mongoose");
    var ClientSchema = new mongoose.Schema({
      name: { type: String, required: true, trim: true },
      notes: { type: String, default: "" },
      attachments: [{
        name: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: Number, default: 0 },
        type: { type: String, default: "" },
        category: { type: String, default: "General" },
        uploadedAt: { type: Date, default: Date.now }
      }]
    }, { timestamps: true });
    module2.exports = mongoose.model("Client", ClientSchema);
  }
});
var require_clients = __commonJS({
  "routes/clients.js"(exports2, module2) {
    var express2 = require("express");
    var Client = require_Client();
    var { verifyToken, requireRole } = require_auth();
    var router = express2.Router();
    router.use(verifyToken);
    router.get("/", async (req, res) => {
      if (req.user.role === "client") {
        if (!req.user.clientId) return res.json([]);
        const c = await Client.findById(req.user.clientId);
        return res.json(c ? [c] : []);
      }
      const list = await Client.find().sort("name");
      res.json(list);
    });
    router.post("/", requireRole("superadmin", "employee"), async (req, res) => {
      const { name, notes, attachments } = req.body;
      if (!name) return res.status(400).json({ error: "Name is required" });
      const c = await Client.create({
        name,
        notes,
        attachments: (attachments || []).map(att => ({
          name: att.name,
          url: att.url,
          size: Number(att.size) || 0,
          type: att.type || "",
          category: att.category || "General",
          uploadedAt: att.uploadedAt || new Date()
        }))
      });
      res.status(201).json(c);
    });
    router.put("/:id", requireRole("superadmin"), async (req, res) => {
      const { name, notes, attachments } = req.body;
      const update = { name, notes };
      if (attachments !== void 0) update.attachments = attachments;
      const c = await Client.findByIdAndUpdate(req.params.id, update, { new: true });
      if (!c) return res.status(404).json({ error: "Not found" });
      res.json(c);
    });
    router.post("/:id/attachments", requireRole("superadmin", "employee"), async (req, res) => {
      try {
        const c = await Client.findById(req.params.id);
        if (!c) return res.status(404).json({ error: "Client not found" });
        const { name, url, size, type, category } = req.body;
        if (!name || !url) return res.status(400).json({ error: "Attachment name and URL are required" });
        c.attachments.push({
          name,
          url,
          size: Number(size) || 0,
          type: type || "",
          category: category || "General",
          uploadedAt: new Date()
        });
        await c.save();
        res.json(c);
      } catch (err) {
        res.status(500).json({ error: "Could not add attachment", detail: err.message });
      }
    });
    router.delete("/:id", requireRole("superadmin"), async (req, res) => {
      await Client.findByIdAndDelete(req.params.id);
      res.json({ ok: true });
    });
    module2.exports = router;
  }
});
var require_Service = __commonJS({
  "models/Service.js"(exports2, module2) {
    var mongoose = require("mongoose");
    var ServiceSchema = new mongoose.Schema({
      name: { type: String, required: true, trim: true },
      hours: { type: Number, default: 0 }
      // reference / informational effort estimate
    }, { timestamps: true });
    module2.exports = mongoose.model("Service", ServiceSchema);
  }
});
var require_services = __commonJS({
  "routes/services.js"(exports2, module2) {
    var express2 = require("express");
    var Service = require_Service();
    var { verifyToken, requireRole } = require_auth();
    var router = express2.Router();
    router.use(verifyToken);
    router.get("/", async (req, res) => {
      const list = await Service.find().sort("name");
      res.json(list);
    });
    router.post("/", requireRole("superadmin", "employee"), async (req, res) => {
      const { name, hours } = req.body;
      if (!name) return res.status(400).json({ error: "Name is required" });
      const s = await Service.create({ name, hours });
      res.status(201).json(s);
    });
    router.put("/:id", requireRole("superadmin"), async (req, res) => {
      const { name, hours } = req.body;
      const s = await Service.findByIdAndUpdate(req.params.id, { name, hours }, { new: true });
      if (!s) return res.status(404).json({ error: "Not found" });
      res.json(s);
    });
    router.delete("/:id", requireRole("superadmin"), async (req, res) => {
      await Service.findByIdAndDelete(req.params.id);
      res.json({ ok: true });
    });
    module2.exports = router;
  }
});
var require_Job = __commonJS({
  "models/Job.js"(exports2, module2) {
    var mongoose = require("mongoose");
    var AssignmentSchema = new mongoose.Schema({
      personId: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", required: true },
      percent: { type: Number, default: 0 },
      hours: { type: Number, default: 0 }
    }, { _id: false });
    var JobSchema = new mongoose.Schema({
      title: { type: String, default: "" },
      clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
      serviceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
      serviceNames: [{ type: String }],
      date: { type: Date, required: true },
      completionDate: { type: Date, default: null },
      status: { type: String, enum: ["In Progress", "Completed"], default: "In Progress" },
      value: { type: Number, default: 0 },
      description: { type: String, default: "" },
      priority: { type: String, enum: ["Medium", "High", "Urgent"], default: "Medium" },
      preferredPersonId: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", default: null },
      preferredPersonName: { type: String, default: "" },
      assignments: [AssignmentSchema],
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
      attachments: [{
        name: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: Number, default: 0 },
        type: { type: String, default: "" },
        uploadedBy: { type: String, default: "" },
        uploadedAt: { type: Date, default: Date.now }
      }],
      deliverables: [{
        name: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: Number, default: 0 },
        type: { type: String, default: "" },
        notes: { type: String, default: "" },
        uploadedBy: { type: String, default: "" },
        uploadedAt: { type: Date, default: Date.now }
      }]
    }, { timestamps: true });
    module2.exports = mongoose.model("Job", JobSchema);
  }
});
var require_Notification = __commonJS({
  "models/Notification.js"(exports2, module2) {
    var mongoose = require("mongoose");
    var NotificationSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      type: {
        type: String,
        default: "general"
      },
      title: { type: String, required: true },
      message: { type: String, required: true },
      jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", default: null },
      targetId: { type: mongoose.Schema.Types.ObjectId, ref: "Target", default: null },
      read: { type: Boolean, default: false },
      attachments: [{
        name: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: Number, default: 0 },
        type: { type: String, default: "" }
      }]
    }, { timestamps: true });
    module2.exports = mongoose.model("Notification", NotificationSchema);
  }
});
var require_notify = __commonJS({
  "utils/notify.js"(exports2, module2) {
    var Notification = require_Notification();
    var User = require_User();
    var Personnel = require_Personnel();
    var Client = require_Client();
    async function createNotificationsForJob({ type, title, message, job, actorId }) {
      try {
        if (!job) return;
        const targetUserIds = /* @__PURE__ */ new Set();
        const superadmins = await User.find({ role: "superadmin", active: true });
        superadmins.forEach((u) => targetUserIds.add(String(u._id)));
        if (job.assignments && job.assignments.length) {
          const pIds = job.assignments.map((a) => a.personId).filter(Boolean);
          if (pIds.length) {
            const assignedUsers = await User.find({ personnelId: { $in: pIds }, active: true });
            assignedUsers.forEach((u) => targetUserIds.add(String(u._id)));
          }
        }
        if (job.clientId) {
          const clientUsers = await User.find({ clientId: job.clientId, active: true });
          clientUsers.forEach((u) => targetUserIds.add(String(u._id)));
        }
        if (job.createdBy) {
          targetUserIds.add(String(job.createdBy));
        }
        const docs = Array.from(targetUserIds).map((uId) => ({
          userId: uId,
          type,
          title,
          message,
          jobId: job._id,
          read: false
        }));
        if (docs.length) {
          await Notification.insertMany(docs);
        }
      } catch (err) {
        console.error("Error creating notifications:", err.message);
      }
    }
    module2.exports = require("./utils/notify");
  }
});
var require_jobs = __commonJS({
  "routes/jobs.js"(exports2, module2) {
    var express2 = require("express");
    var Job = require_Job();
    var Service = require_Service();
    var Personnel = require_Personnel();
    var { verifyToken, requireRole } = require_auth();
    var { createNotificationsForJob } = require("./utils/notify");
    var router = express2.Router();
    router.use(verifyToken);
    router.get("/", async (req, res) => {
      const filter = {};
      if (req.user.role === "client") {
        if (!req.user.clientId) return res.json([]);
        filter.clientId = req.user.clientId;
      } else if (req.query.mine === "true" && req.user.personnelId) {
        filter["assignments.personId"] = req.user.personnelId;
      }
      if (req.query.clientId) filter.clientId = req.query.clientId;
      const jobs = await Job.find(filter).sort("-date").lean();
      res.json(jobs);
    });
    router.post("/", requireRole("superadmin", "employee", "client"), async (req, res) => {
      try {
        let { title, clientId, serviceIds, date, completionDate, status, value, description, priority, preferredPersonId, assignments, attachments, deliverables } = req.body;
        if (req.user.role === "client") {
          if (!req.user.clientId) return res.status(400).json({ error: "No client profile linked to this user" });
          clientId = req.user.clientId;
          if (!assignments || !assignments.length) {
            assignments = [];
            if (preferredPersonId) {
              assignments.push({
                personId: preferredPersonId,
                percent: 100,
                hours: 0
              });
            } else {
              const defaultPersons = await Personnel.find({ name: { $in: [/mansi/i, /urna/i] } });
              defaultPersons.forEach((p) => {
                assignments.push({
                  personId: p._id,
                  percent: 0,
                  hours: 0
                });
              });
            }
          }
        }
        if (!clientId) return res.status(400).json({ error: "Client is required" });
        if (!serviceIds || !serviceIds.length) return res.status(400).json({ error: "At least one service is required" });
        if (!date) return res.status(400).json({ error: "Start date is required" });
        if (req.user.role !== "client") {
          if (!assignments || !assignments.length) return res.status(400).json({ error: "At least one person must be assigned" });
          for (const a of assignments) {
            if (a.hours === "" || a.hours == null) return res.status(400).json({ error: "Enter hours spent for every assigned person" });
          }
        }
        const services = await Service.find({ _id: { $in: serviceIds } });
        const serviceNames = services.map((s) => s.name);
        let preferredPersonName = "";
        if (preferredPersonId) {
          const prefPerson = await Personnel.findById(preferredPersonId);
          if (prefPerson) preferredPersonName = prefPerson.name;
        }
        const validPriorities = ["Medium", "High", "Urgent"];
        const jobPriority = validPriorities.includes(priority) ? priority : "Medium";
        const job = await Job.create({
          title: title || "",
          clientId,
          serviceIds,
          serviceNames,
          date,
          completionDate: completionDate || null,
          status: status || "In Progress",
          value: Number(value) || 0,
          description: description || "",
          priority: jobPriority,
          preferredPersonId: preferredPersonId || null,
          preferredPersonName,
          assignments: (assignments || []).map((a) => ({ personId: a.personId, percent: Number(a.percent) || 0, hours: Number(a.hours) || 0 })),
          attachments: (attachments || []).map(att => ({
            name: att.name,
            url: att.url,
            size: Number(att.size) || 0,
            type: att.type || "",
            uploadedBy: att.uploadedBy || req.user.name || "User",
            uploadedAt: att.uploadedAt || new Date()
          })),
          deliverables: (deliverables || []).map(del => ({
            name: del.name,
            url: del.url,
            size: Number(del.size) || 0,
            type: del.type || "",
            notes: del.notes || "",
            uploadedBy: del.uploadedBy || req.user.name || "User",
            uploadedAt: del.uploadedAt || new Date()
          })),
          createdBy: req.user._id
        });
        await createNotificationsForJob({
          type: "job_created",
          title: "New Job Logged",
          message: `Job "${job.title || "Untitled"}" was logged.`,
          job,
          actorId: req.user._id
        });
        res.status(201).json(job);
      } catch (err) {
        res.status(500).json({ error: "Could not save job", detail: err.message });
      }
    });
    router.patch("/:id/status", requireRole("superadmin", "employee"), async (req, res) => {
      try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        if (req.body.completed === true || req.body.status === "Completed") {
          job.status = "Completed";
          if (!job.completionDate) job.completionDate = new Date();
        } else if (req.body.completed === false || req.body.status === "In Progress") {
          job.status = "In Progress";
          job.completionDate = null;
        } else {
          // Toggle
          const willBeDone = job.status !== "Completed";
          job.status = willBeDone ? "Completed" : "In Progress";
          job.completionDate = willBeDone ? new Date() : null;
        }
        await job.save();
        await createNotificationsForJob({
          type: "status_changed",
          title: "Job Status Updated",
          message: `Job "${job.title || "Untitled"}" is now ${job.status}.`,
          job,
          actorId: req.user._id
        });
        res.json(job);
      } catch (err) {
        res.status(500).json({ error: "Could not update status", detail: err.message });
      }
    });
    router.put("/:id", requireRole("superadmin", "employee"), async (req, res) => {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ error: "Not found" });
      if (req.user.role === "employee") {
        let userPId = String(req.user.personnelId?._id || req.user.personnelId || "");
        if (!userPId) {
          const p = await Personnel.findOne({ name: new RegExp(req.user.name, "i") });
          if (p) userPId = String(p._id);
        }
        const isAssigned = (job.assignments || []).some((a) => String(a.personId) === userPId);
        const isCreator = String(job.createdBy) === String(req.user._id);
        const isLead = /mansi/i.test(req.user.name) || /urna/i.test(req.user.name);
        if (!isAssigned && !isCreator && !isLead) {
          return res.status(403).json({ error: "You can only edit jobs assigned to you or logged yourself" });
        }
      }
      const { title, clientId, serviceIds, date, completionDate, status, value, description, priority, preferredPersonId, assignments, myHours, attachments, deliverables } = req.body;
      if (title !== void 0) job.title = title;
      if (clientId) job.clientId = clientId;
      if (serviceIds) {
        job.serviceIds = serviceIds;
        const services = await Service.find({ _id: { $in: serviceIds } });
        job.serviceNames = services.map((s) => s.name);
      }
      if (date) job.date = date;
      
      // Synchronize status and completionDate
      if (status) {
        job.status = status;
        if (status === "Completed") {
          job.completionDate = completionDate ? new Date(completionDate) : (job.completionDate || new Date());
        } else if (status === "In Progress") {
          job.completionDate = null;
        }
      } else if (completionDate !== void 0) {
        if (completionDate) {
          job.completionDate = new Date(completionDate);
          job.status = "Completed";
        } else {
          job.completionDate = null;
          job.status = "In Progress";
        }
      }

      if (value !== void 0) job.value = Number(value) || 0;
      if (description !== void 0) job.description = description;
      if (priority && ["Medium", "High", "Urgent"].includes(priority)) job.priority = priority;
      if (attachments !== void 0) job.attachments = attachments;
      if (deliverables !== void 0) job.deliverables = deliverables;
      if (preferredPersonId !== void 0) {
        job.preferredPersonId = preferredPersonId || null;
        if (preferredPersonId) {
          const prefPerson = await Personnel.findById(preferredPersonId);
          job.preferredPersonName = prefPerson ? prefPerson.name : "";
        } else {
          job.preferredPersonName = "";
        }
      }
      if (assignments) {
        const validAss = (assignments || []).filter((a) => a && a.personId && String(a.personId).trim() !== "");
        job.assignments = validAss.map((a) => ({ personId: a.personId, percent: Number(a.percent) || 0, hours: Number(a.hours) || 0 }));
      } else if (myHours !== void 0) {
        let userPId = String(req.user.personnelId?._id || req.user.personnelId || "");
        if (!userPId) {
          const p = await Personnel.findOne({ name: new RegExp(req.user.name, "i") });
          if (p) userPId = String(p._id);
        }
        const ass = (job.assignments || []).find((a) => String(a.personId) === userPId);
        if (ass) {
          ass.hours = Number(myHours) || 0;
          job.markModified("assignments");
        }
      }
      await job.save();
      await createNotificationsForJob({
        type: "job_updated",
        title: "Job Details Updated",
        message: `Job "${job.title || "Untitled"}" is ${job.status}.`,
        job,
        actorId: req.user._id
      });
      res.json(job);
    });
    router.post("/:id/deliverables", requireRole("superadmin", "employee", "client"), async (req, res) => {
      try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });

        const items = Array.isArray(req.body.deliverables)
          ? req.body.deliverables
          : (Array.isArray(req.body) ? req.body : [req.body]);

        const valid = items.filter(d => d && (d.url || d.base64 || d.data));
        if (!valid.length) {
          return res.status(400).json({ error: "Deliverable name and URL are required" });
        }

        valid.forEach(d => {
          job.deliverables.push({
            name: d.name || "Deliverable",
            url: d.url || d.base64 || d.data,
            size: Number(d.size) || 0,
            type: d.type || "",
            notes: d.notes || "",
            uploadedBy: req.user.name || "User",
            uploadedAt: new Date()
          });
        });

        if (req.body.markComplete === true || req.body.status === "Completed") {
          job.status = "Completed";
          if (!job.completionDate) job.completionDate = new Date();
        }

        await job.save();

        const firstName = valid[0].name || "Deliverable";
        await createNotificationsForJob({
          type: "deliverable_added",
          title: "New Deliverable Attached",
          message: `"${firstName}" was attached to Job "${job.title || "Untitled"}".`,
          job,
          actorId: req.user._id
        });

        res.json(job);
      } catch (err) {
        res.status(500).json({ error: "Could not add deliverable", detail: err.message });
      }
    });

    router.post("/:id/attachments", requireRole("superadmin", "employee", "client"), async (req, res) => {
      try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });

        const items = Array.isArray(req.body.attachments)
          ? req.body.attachments
          : (Array.isArray(req.body) ? req.body : [req.body]);

        const valid = items.filter(a => a && (a.url || a.base64 || a.data));
        if (!valid.length) {
          return res.status(400).json({ error: "Attachment name and URL are required" });
        }

        valid.forEach(a => {
          job.attachments.push({
            name: a.name || "Attachment",
            url: a.url || a.base64 || a.data,
            size: Number(a.size) || 0,
            type: a.type || "",
            uploadedBy: req.user.name || "User",
            uploadedAt: new Date()
          });
        });

        await job.save();
        res.json(job);
      } catch (err) {
        res.status(500).json({ error: "Could not add attachment", detail: err.message });
      }
    });

    router.post("/:id/approve", requireRole("superadmin", "client"), async (req, res) => {
      try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        if (req.user.role === "client" && String(job.clientId) !== String(req.user.clientId)) {
          return res.status(403).json({ error: "You can only approve jobs for your own account" });
        }

        const { rating, feedback } = req.body;
        job.status = "Completed";
        if (!job.completionDate) job.completionDate = new Date();
        job.clientApproval = job.clientApproval || {};
        job.clientApproval.status = "Approved";
        job.clientApproval.approvedAt = new Date();
        job.clientApproval.approvedBy = req.user.name || "Client";
        if (feedback) job.clientApproval.feedback = feedback;
        if (rating && Number(rating) >= 1 && Number(rating) <= 5) {
          job.clientApproval.rating = Number(rating);
        }

        await job.save();

        await createNotificationsForJob({
          type: "job_approved",
          title: "🎉 Deliverables Approved by Client",
          message: `Client approved deliverables for Job "${job.title || "Untitled"}"${rating ? ` (${rating}★)` : ""}.`,
          job,
          actorId: req.user._id
        });

        res.json(job);
      } catch (err) {
        res.status(500).json({ error: "Could not approve job", detail: err.message });
      }
    });

    router.post("/:id/revision", requireRole("superadmin", "client"), async (req, res) => {
      try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        if (req.user.role === "client" && String(job.clientId) !== String(req.user.clientId)) {
          return res.status(403).json({ error: "You can only request revisions for your own account" });
        }

        const { feedback, attachments } = req.body;
        if (!feedback || !feedback.trim()) {
          return res.status(400).json({ error: "Please describe the revision requested" });
        }

        job.status = "Needs Revision";
        job.clientApproval = job.clientApproval || {};
        job.clientApproval.status = "Revision Requested";
        job.clientApproval.feedback = feedback.trim();
        job.clientApproval.revisions = job.clientApproval.revisions || [];
        job.clientApproval.revisions.push({
          requestedAt: new Date(),
          requestedBy: req.user.name || "Client",
          feedback: feedback.trim(),
          attachments: Array.isArray(attachments) ? attachments : []
        });

        await job.save();

        await createNotificationsForJob({
          type: "revision_requested",
          title: "↺ Revision Requested by Client",
          message: `Client requested revision on Job "${job.title || "Untitled"}": "${feedback.trim().slice(0, 100)}"`,
          job,
          actorId: req.user._id
        });

        res.json(job);
      } catch (err) {
        res.status(500).json({ error: "Could not request revision", detail: err.message });
      }
    });
    router.delete("/:id", requireRole("superadmin", "employee"), async (req, res) => {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ error: "Not found" });
      if (req.user.role === "employee" && String(job.createdBy) !== String(req.user._id)) {
        return res.status(403).json({ error: "You can only delete jobs you logged yourself" });
      }
      await Job.findByIdAndDelete(req.params.id);
      res.json({ ok: true });
    });
    module2.exports = router;
  }
});
var require_Roster = __commonJS({
  "models/Roster.js"(exports2, module2) {
    var mongoose = require("mongoose");
    var RosterSchema = new mongoose.Schema({
      clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
      nature: { type: String, enum: ["Existing", "Prospect"], default: "Existing" },
      roles: {
        strategy: { type: String, default: "" },
        cs: { type: String, default: "" },
        website: { type: String, default: "" },
        design: { type: String, default: "" },
        copy: { type: String, default: "" },
        edit: { type: String, default: "" },
        shoot: { type: String, default: "" },
        seo: { type: String, default: "" },
        smo: { type: String, default: "" },
        qc: { type: String, default: "" }
      },
      difficulty: { type: Number, min: 1, max: 10, default: 5 },
      comments: { type: String, default: "" }
    }, { timestamps: true });
    module2.exports = mongoose.model("Roster", RosterSchema);
  }
});
var require_roster = __commonJS({
  "routes/roster.js"(exports2, module2) {
    var express2 = require("express");
    var Roster = require_Roster();
    var { verifyToken, requireRole } = require_auth();
    var router = express2.Router();
    router.use(verifyToken);
    router.get("/", async (req, res) => {
      const filter = {};
      if (req.user.role === "client") {
        if (!req.user.clientId) return res.json([]);
        filter.clientId = req.user.clientId;
      }
      const list = await Roster.find(filter).sort("-difficulty");
      res.json(list);
    });
    router.post("/", requireRole("superadmin"), async (req, res) => {
      const { clientId, nature, roles, difficulty, comments } = req.body;
      if (!clientId) return res.status(400).json({ error: "Client is required" });
      const r = await Roster.create({ clientId, nature, roles, difficulty, comments });
      res.status(201).json(r);
    });
    router.put("/:id", requireRole("superadmin"), async (req, res) => {
      const { nature, roles, difficulty, comments } = req.body;
      const r = await Roster.findByIdAndUpdate(req.params.id, { nature, roles, difficulty, comments }, { new: true });
      if (!r) return res.status(404).json({ error: "Not found" });
      res.json(r);
    });
    router.delete("/:id", requireRole("superadmin"), async (req, res) => {
      await Roster.findByIdAndDelete(req.params.id);
      res.json({ ok: true });
    });
    router.post("/reassign", requireRole("superadmin"), async (req, res) => {
      const { from, to } = req.body;
      if (!from || !to) return res.status(400).json({ error: "from and to are required" });
      const roleKeys = ["strategy", "cs", "website", "design", "copy", "edit", "shoot", "seo", "smo", "qc"];
      const all = await Roster.find();
      let count = 0;
      for (const r of all) {
        let changed = false;
        roleKeys.forEach((key) => {
          const names = String(r.roles[key] || "").split(",").map((s) => s.trim()).filter(Boolean);
          if (names.includes(from)) {
            const replaced = [...new Set(names.map((n) => n === from ? to : n))];
            r.roles[key] = replaced.join(", ");
            changed = true;
          }
        });
        if (changed) {
          count += 1;
          await r.save();
        }
      }
      res.json({ ok: true, accountsUpdated: count });
    });
    module2.exports = router;
  }
});
var require_Target = __commonJS({
  "models/Target.js"(exports2, module2) {
    var mongoose = require("mongoose");
    var TargetSchema = new mongoose.Schema({
      personId: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", required: true },
      serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
      quantity: { type: Number, default: 1 },
      unit: { type: String, default: "count" },
      period: { type: String, enum: ["day", "week", "month"], default: "day" },
      completed: { type: Number, default: 0 },
      attachments: [{
        name: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: Number, default: 0 },
        type: { type: String, default: "" },
        notes: { type: String, default: "" },
        uploadedAt: { type: Date, default: Date.now }
      }]
    }, { timestamps: true });
    module2.exports = mongoose.model("Target", TargetSchema);
  }
});
var require_stats = __commonJS({
  "utils/stats.js"(exports2, module2) {
    function startOfDay(d) {
      const x = new Date(d);
      x.setHours(0, 0, 0, 0);
      return x;
    }
    function startOfWeek(d) {
      const day = d.getDay();
      const diff = day === 0 ? -6 : 1 - day;
      const m = new Date(d);
      m.setDate(d.getDate() + diff);
      m.setHours(0, 0, 0, 0);
      return m;
    }
    function startOfMonth(d) {
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }
    function startOfQuarter(d) {
      const q = Math.floor(d.getMonth() / 3);
      return new Date(d.getFullYear(), q * 3, 1);
    }
    function periodRange(period) {
      const now = /* @__PURE__ */ new Date();
      let from, to = now;
      if (period === "today") {
        from = startOfDay(now);
      } else if (period === "week") {
        from = startOfWeek(now);
      } else if (period === "quarter") {
        from = startOfQuarter(now);
      } else if (period === "all") {
        from = new Date(2e3, 0, 1);
      } else {
        from = startOfMonth(now);
      }
      return { from, to };
    }
    function weeksBetween(from, to) {
      return Math.max((to - from) / 864e5 / 7, 1 / 7);
    }
    function utilStatus(u) {
      if (u >= 115) return { label: "Overworked", cls: "red" };
      if (u >= 90) return { label: "Stretched", cls: "amber" };
      if (u >= 55) return { label: "Balanced", cls: "green" };
      if (u >= 25) return { label: "Underutilised", cls: "blue" };
      return { label: "Idle", cls: "gray" };
    }
    function computePersonStats(jobs, personnelList, from, to) {
      const weeks = weeksBetween(from, to);
      const map = {};
      personnelList.forEach((p) => {
        map[String(p._id)] = { person: p, hours: 0, revenue: 0, jobCount: 0 };
      });
      jobs.forEach((job) => {
        (job.assignments || []).forEach((a) => {
          const key = String(a.personId);
          const bucket = map[key];
          if (!bucket) return;
          bucket.hours += Number(a.hours) || 0;
          bucket.revenue += (Number(job.value) || 0) * (Number(a.percent) || 0) / 100;
          bucket.jobCount += 1;
        });
      });
      Object.values(map).forEach((b) => {
        const capacityHours = (b.person.capacity || 48) * weeks;
        b.capacityHours = capacityHours;
        b.utilization = capacityHours > 0 ? b.hours / capacityHours * 100 : 0;
      });
      return map;
    }
    function computeClientStats(jobs, clientsList) {
      const map = {};
      clientsList.forEach((c) => {
        map[String(c._id)] = { client: c, value: 0, hours: 0, jobCount: 0, peopleSet: /* @__PURE__ */ new Set(), services: {} };
      });
      jobs.forEach((job) => {
        const bucket = map[String(job.clientId)];
        if (!bucket) return;
        bucket.value += Number(job.value) || 0;
        bucket.jobCount += 1;
        (job.serviceNames || []).forEach((n) => {
          bucket.services[n] = (bucket.services[n] || 0) + 1;
        });
        (job.assignments || []).forEach((a) => {
          bucket.hours += Number(a.hours) || 0;
          bucket.peopleSet.add(String(a.personId));
        });
      });
      return map;
    }
    function filterJobsInRange(jobs, from, to) {
      const toEnd = new Date(to.getTime() + 86399999);
      return jobs.filter((j) => {
        const d = new Date(j.date);
        return d >= from && d <= toEnd;
      });
    }
    function computeRosterLoad(rosterList, roleKeys) {
      const load = {};
      rosterList.forEach((r) => {
        const names = /* @__PURE__ */ new Set();
        roleKeys.forEach((key) => {
          String((r.roles || {})[key] || "").split(",").map((s) => s.trim()).filter(Boolean).forEach((n) => {
            if (n && n !== "TBD") names.add(n);
          });
        });
        names.forEach((n) => {
          load[n] = load[n] || { accounts: 0, difficultySum: 0 };
          load[n].accounts += 1;
          load[n].difficultySum += Number(r.difficulty) || 0;
        });
      });
      return load;
    }
    var ROLE_KEYS = ["strategy", "cs", "website", "design", "copy", "edit", "shoot", "seo", "smo", "qc"];
    module2.exports = {
      periodRange,
      weeksBetween,
      utilStatus,
      computePersonStats,
      computeClientStats,
      filterJobsInRange,
      computeRosterLoad,
      ROLE_KEYS,
      startOfDay,
      startOfWeek,
      startOfMonth
    };
  }
});
var require_targets = __commonJS({
  "routes/targets.js"(exports2, module2) {
    var express2 = require("express");
    var Target = require_Target();
    var Job = require_Job();
    var { verifyToken, requireRole } = require_auth();
    var { startOfDay, startOfWeek, startOfMonth } = require_stats();
    var router = express2.Router();
    var Personnel = require_Personnel();
    router.use(verifyToken);
    async function actualForTarget(t) {
      const now = /* @__PURE__ */ new Date();
      let from;
      if (t.period === "day") from = startOfDay(now);
      else if (t.period === "week") from = startOfWeek(now);
      else from = startOfMonth(now);
      const jobs = await Job.find({
        serviceIds: t.serviceId,
        date: { $gte: from, $lte: now },
        "assignments.personId": t.personId
      }).lean();
      let count = 0, hours = 0;
      jobs.forEach((j) => {
        (j.assignments || []).forEach((a) => {
          if (String(a.personId) === String(t.personId)) {
            count += 1;
            hours += Number(a.hours) || 0;
          }
        });
      });
      const autoVal = t.unit === "hours" ? hours : count;
      if (t.completed !== void 0 && t.completed !== null && t.completed > 0) {
        return Math.max(t.completed, autoVal);
      }
      return autoVal;
    }
    router.get("/", async (req, res) => {
      let filter = {};
      if (req.user.role === "employee") {
        let pId = req.user.personnelId;
        if (!pId) {
          const p = await Personnel.findOne({ name: new RegExp(req.user.name, "i") });
          if (p) pId = p._id;
        }
        const isLead = /mansi/i.test(req.user.name) || /urna/i.test(req.user.name);
        if (req.query.mine === "true" || !isLead) {
          if (pId) filter.personId = pId;
        }
      } else if (req.query.personId) {
        filter.personId = req.query.personId;
      }
      const targets = await Target.find(filter).populate("personId", "name").populate("serviceId", "name");
      const withActuals = await Promise.all(targets.map(async (t) => ({
        ...t.toObject(),
        actual: await actualForTarget(t)
      })));
      res.json(withActuals);
    });
    router.post("/", requireRole("superadmin", "employee"), async (req, res) => {
      let { personId, serviceId, quantity, unit, period, completed, attachments } = req.body;
      if (req.user.role === "employee") {
        let userPId = String(req.user.personnelId?._id || req.user.personnelId || "");
        if (!userPId) {
          const p = await Personnel.findOne({ name: new RegExp(req.user.name, "i") });
          if (p) userPId = String(p._id);
        }
        const isLead = /mansi/i.test(req.user.name) || /urna/i.test(req.user.name);
        if (!isLead || !personId) {
          personId = userPId;
        }
      }
      if (!personId || !serviceId) return res.status(400).json({ error: "Person and service are required" });
      const t = await Target.create({
        personId,
        serviceId,
        quantity,
        unit: unit || "count",
        period: period || "day",
        completed: Number(completed) || 0,
        attachments: (attachments || []).map(att => ({
          name: att.name,
          url: att.url,
          size: Number(att.size) || 0,
          type: att.type || "",
          notes: att.notes || "",
          uploadedAt: att.uploadedAt || new Date()
        }))
      });
      res.status(201).json(t);
    });
    router.put("/:id", requireRole("superadmin", "employee"), async (req, res) => {
      const { quantity, unit, period, serviceId, personId, completed, attachments } = req.body;
      const target = await Target.findById(req.params.id);
      if (!target) return res.status(404).json({ error: "Target not found" });

      if (req.user.role === "employee") {
        let userPId = String(req.user.personnelId?._id || req.user.personnelId || "");
        if (!userPId) {
          const p = await Personnel.findOne({ name: new RegExp(req.user.name, "i") });
          if (p) userPId = String(p._id);
        }
        const isOwner = String(target.personId) === userPId;
        const isLead = /mansi/i.test(req.user.name) || /urna/i.test(req.user.name);
        if (!isOwner && !isLead) {
          return res.status(403).json({ error: "You can only edit targets assigned to you" });
        }
      }

      if (quantity !== void 0) target.quantity = Number(quantity) || 1;
      if (unit) target.unit = unit;
      if (period) target.period = period;
      if (completed !== void 0) target.completed = Number(completed) || 0;
      if (serviceId) target.serviceId = serviceId;
      if (attachments !== void 0) target.attachments = attachments;
      if (personId && req.user.role === "superadmin") target.personId = personId;

      await target.save();
      res.json(target);
    });
    router.post("/:id/attachments", requireRole("superadmin", "employee"), async (req, res) => {
      try {
        const target = await Target.findById(req.params.id);
        if (!target) return res.status(404).json({ error: "Target not found" });
        const { name, url, size, type, notes } = req.body;
        if (!name || !url) return res.status(400).json({ error: "Attachment name and URL are required" });
        target.attachments.push({
          name,
          url,
          size: Number(size) || 0,
          type: type || "",
          notes: notes || "",
          uploadedAt: new Date()
        });
        await target.save();
        res.json(target);
      } catch (err) {
        res.status(500).json({ error: "Could not add attachment", detail: err.message });
      }
    });
    router.delete("/:id", requireRole("superadmin", "employee"), async (req, res) => {
      const target = await Target.findById(req.params.id);
      if (!target) return res.status(404).json({ error: "Target not found" });

      if (req.user.role === "employee") {
        let userPId = String(req.user.personnelId?._id || req.user.personnelId || "");
        if (!userPId) {
          const p = await Personnel.findOne({ name: new RegExp(req.user.name, "i") });
          if (p) userPId = String(p._id);
        }
        const isOwner = String(target.personId) === userPId;
        const isLead = /mansi/i.test(req.user.name) || /urna/i.test(req.user.name);
        if (!isOwner && !isLead) {
          return res.status(403).json({ error: "You can only delete targets assigned to you" });
        }
      }

      await Target.findByIdAndDelete(req.params.id);
      res.json({ ok: true });
    });
    module2.exports = router;
  }
});
var require_SalaryGrade = __commonJS({
  "models/SalaryGrade.js"(exports2, module2) {
    var mongoose = require("mongoose");
    var SalaryGradeSchema = new mongoose.Schema({
      label: { type: String, required: true },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 }
    }, { timestamps: true });
    module2.exports = mongoose.model("SalaryGrade", SalaryGradeSchema);
  }
});
var require_SalaryAssignment = __commonJS({
  "models/SalaryAssignment.js"(exports2, module2) {
    var mongoose = require("mongoose");
    var SalaryAssignmentSchema = new mongoose.Schema({
      personId: { type: mongoose.Schema.Types.ObjectId, ref: "Personnel", required: true, unique: true },
      gradeId: { type: mongoose.Schema.Types.ObjectId, ref: "SalaryGrade", required: true }
    }, { timestamps: true });
    module2.exports = mongoose.model("SalaryAssignment", SalaryAssignmentSchema);
  }
});
var require_salary = __commonJS({
  "routes/salary.js"(exports2, module2) {
    var express2 = require("express");
    var SalaryGrade = require_SalaryGrade();
    var SalaryAssignment = require_SalaryAssignment();
    var { verifyToken, requireRole } = require_auth();
    var router = express2.Router();
    router.use(verifyToken, requireRole("superadmin"));
    router.get("/grades", async (req, res) => {
      res.json(await SalaryGrade.find().sort("min"));
    });
    router.post("/grades", async (req, res) => {
      const { label, min, max } = req.body;
      if (!label) return res.status(400).json({ error: "Label is required" });
      res.status(201).json(await SalaryGrade.create({ label, min, max }));
    });
    router.put("/grades/:id", async (req, res) => {
      const { label, min, max } = req.body;
      const g = await SalaryGrade.findByIdAndUpdate(req.params.id, { label, min, max }, { new: true });
      if (!g) return res.status(404).json({ error: "Not found" });
      res.json(g);
    });
    router.delete("/grades/:id", async (req, res) => {
      await SalaryGrade.findByIdAndDelete(req.params.id);
      await SalaryAssignment.deleteMany({ gradeId: req.params.id });
      res.json({ ok: true });
    });
    router.get("/assignments", async (req, res) => {
      res.json(await SalaryAssignment.find());
    });
    router.put("/assignments/:personId", async (req, res) => {
      const { gradeId } = req.body;
      if (!gradeId) {
        await SalaryAssignment.findOneAndDelete({ personId: req.params.personId });
        return res.json({ ok: true, cleared: true });
      }
      const a = await SalaryAssignment.findOneAndUpdate(
        { personId: req.params.personId },
        { personId: req.params.personId, gradeId },
        { new: true, upsert: true }
      );
      res.json(a);
    });
    module2.exports = router;
  }
});
var require_dashboard = __commonJS({
  "routes/dashboard.js"(exports2, module2) {
    var express2 = require("express");
    var Job = require_Job();
    var Personnel = require_Personnel();
    var Client = require_Client();
    var Roster = require_Roster();
    var { verifyToken, requireRole } = require_auth();
    var {
      periodRange,
      weeksBetween,
      utilStatus,
      computePersonStats,
      computeClientStats,
      filterJobsInRange,
      computeRosterLoad,
      ROLE_KEYS
    } = require_stats();
    var router = express2.Router();
    router.use(verifyToken);
    function buildInsights(personMap) {
      const out = [];
      const active = Object.values(personMap).filter((b) => b.person.status !== "vendor" && b.person.status !== "inactive");
      const overworked = active.filter((b) => utilStatus(b.utilization).label === "Overworked").sort((a, b) => b.utilization - a.utilization);
      overworked.slice(0, 5).forEach((b) => {
        out.push({
          type: "red",
          text: `${b.person.name} is running at ${b.utilization.toFixed(0)}% of capacity (${b.hours.toFixed(1)} hrs logged). Duties: ${b.person.duties}. Consider redistributing work, backfilling with a hire, or leaning on external support for overflow.`
        });
      });
      const idle = active.filter((b) => ["Idle", "Underutilised"].includes(utilStatus(b.utilization).label) && b.hours > 0).sort((a, b) => a.utilization - b.utilization);
      idle.slice(0, 4).forEach((b) => {
        out.push({ type: "blue", text: `${b.person.name} is at ${b.utilization.toFixed(0)}% of capacity. There's room here \u2014 consider cross-training toward a stretched role, or reassigning accounts.` });
      });
      return out;
    }
    router.get("/admin", requireRole("superadmin"), async (req, res) => {
      const period = req.query.period || "month";
      const { from, to } = periodRange(period);
      const [allJobs, personnel, clients, roster] = await Promise.all([
        Job.find().lean(),
        Personnel.find().lean(),
        Client.find().lean(),
        Roster.find().lean()
      ]);
      const jobs = filterJobsInRange(allJobs, from, to);
      const personMap = computePersonStats(jobs, personnel, from, to);
      const clientMap = computeClientStats(jobs, clients);
      const rosterLoad = computeRosterLoad(roster, ROLE_KEYS);
      let totalValue = 0, totalHours = 0;
      jobs.forEach((j) => {
        totalValue += Number(j.value) || 0;
        (j.assignments || []).forEach((a) => {
          totalHours += Number(a.hours) || 0;
        });
      });
      const personArr = Object.values(personMap).map((b) => ({
        personId: b.person._id,
        name: b.person.name,
        duties: b.person.duties,
        status: b.person.status,
        hours: b.hours,
        revenue: b.revenue,
        jobCount: b.jobCount,
        utilization: b.utilization,
        ...utilStatus(b.utilization)
      })).sort((a, b) => b.utilization - a.utilization);
      const clientArr = Object.values(clientMap).map((c) => ({
        clientId: c.client._id,
        name: c.client.name,
        value: c.value,
        hours: c.hours,
        jobCount: c.jobCount,
        peopleCount: c.peopleSet.size,
        services: c.services
      })).sort((a, b) => b.value - a.value);
      const svcTotals = {};
      jobs.forEach((j) => {
        const names = j.serviceNames && j.serviceNames.length ? j.serviceNames : ["\u2014"];
        const share = (Number(j.value) || 0) / names.length;
        names.forEach((n) => {
          svcTotals[n] = (svcTotals[n] || 0) + share;
        });
      });
      const serviceArr = Object.entries(svcTotals).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
      res.json({
        period,
        from,
        to,
        overview: {
          totalValue,
          totalHours,
          totalJobs: jobs.length,
          activeClients: new Set(jobs.map((j) => String(j.clientId))).size,
          totalClients: clients.length,
          overworked: personArr.filter((p) => p.label === "Overworked").length,
          underused: personArr.filter((p) => p.label === "Idle" || p.label === "Underutilised").length
        },
        insights: buildInsights(personMap),
        personnel: personArr,
        clients: clientArr,
        services: serviceArr,
        rosterLoad
      });
    });
    router.get("/employee", requireRole("employee"), async (req, res) => {
      if (!req.user.personnelId) return res.status(400).json({ error: "This login is not linked to a personnel record. Ask your admin to link it." });
      const period = req.query.period || "month";
      const { from, to } = periodRange(period);
      const weeks = weeksBetween(from, to);
      const [allJobs, person, roster] = await Promise.all([
        Job.find({ "assignments.personId": req.user.personnelId }).populate("clientId", "name").lean(),
        Personnel.findById(req.user.personnelId).lean(),
        Roster.find().lean()
      ]);
      if (!person) return res.status(404).json({ error: "Personnel record not found" });
      const jobs = filterJobsInRange(allJobs, from, to);
      let hours = 0, revenue = 0;
      jobs.forEach((j) => {
        (j.assignments || []).forEach((a) => {
          if (String(a.personId) === String(req.user.personnelId)) {
            hours += Number(a.hours) || 0;
            revenue += (Number(j.value) || 0) * (Number(a.percent) || 0) / 100;
          }
        });
      });
      const capacityHours = (person.capacity || 48) * weeks;
      const utilization = capacityHours > 0 ? hours / capacityHours * 100 : 0;
      const myAccounts = roster.filter((r) => ROLE_KEYS.some((k) => String(r.roles[k] || "").split(",").map((s) => s.trim()).includes(person.name)));
      res.json({
        period,
        from,
        to,
        person: { name: person.name, duties: person.duties, capacity: person.capacity, status: person.status },
        stats: { hours, revenue, jobCount: jobs.length, utilization, ...utilStatus(utilization) },
        recentJobs: jobs.slice(0, 20),
        accountsCount: myAccounts.length,
        accounts: myAccounts.map((r) => ({ id: r._id, clientId: r.clientId, difficulty: r.difficulty, nature: r.nature }))
      });
    });
    router.get("/client", requireRole("client"), async (req, res) => {
      if (!req.user.clientId) return res.status(400).json({ error: "This login is not linked to a client record. Ask your admin to link it." });
      const period = req.query.period || "month";
      const { from, to } = periodRange(period);
      const [allJobs, client, rosterEntries] = await Promise.all([
        Job.find({ clientId: req.user.clientId }).lean(),
        Client.findById(req.user.clientId).lean(),
        Roster.find({ clientId: req.user.clientId }).lean()
      ]);
      const jobs = filterJobsInRange(allJobs, from, to);
      let value = 0, hours = 0;
      jobs.forEach((j) => {
        value += Number(j.value) || 0;
        (j.assignments || []).forEach((a) => {
          hours += Number(a.hours) || 0;
        });
      });
      res.json({
        period,
        from,
        to,
        client,
        stats: { value, hours, jobCount: jobs.length, completed: jobs.filter((j) => j.completionDate).length, inProgress: jobs.filter((j) => !j.completionDate).length },
        roster: rosterEntries,
        jobs: allJobs.sort((a, b) => new Date(b.date) - new Date(a.date))
      });
    });
    module2.exports = router;
  }
});
var require_notifications = __commonJS({
  "routes/notifications.js"(exports2, module2) {
    var express2 = require("express");
    var router = express2.Router();
    var Notification = require_Notification();
    var Job = require_Job();
    var Target = require_Target();
    var Personnel = require_Personnel();
    var Service = require_Service();
    var { verifyToken } = require_auth();
    router.use(verifyToken);
    router.get("/", async (req, res) => {
      try {
        const userId = req.user._id;
        const todayStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        let jobFilter = { status: { $ne: "Completed" } };
        let pId = req.user.personnelId;
        if (req.user.role === "employee") {
          if (!pId) {
            const p = await Personnel.findOne({ name: new RegExp(req.user.name, "i") });
            if (p) pId = p._id;
          }
          if (pId) jobFilter["assignments.personId"] = pId;
        } else if (req.user.role === "client" && req.user.clientId) {
          jobFilter.clientId = req.user.clientId;
        }
        const upcomingJobs = await Job.find(jobFilter).limit(20);
        for (const j of upcomingJobs) {
          const jobDateStr = j.completionDate ? new Date(j.completionDate).toISOString().slice(0, 10) : j.date ? new Date(j.date).toISOString().slice(0, 10) : null;
          if (jobDateStr && jobDateStr <= todayStr) {
            const existing = await Notification.findOne({ userId, jobId: j._id, type: "job_due" });
            if (!existing) {
              await Notification.create({
                userId,
                type: "job_due",
                title: jobDateStr < todayStr ? "\u26A0\uFE0F Overdue Job" : "\u23F3 Job Due Today",
                message: `Job "${j.title || "Untitled Job"}" is ${jobDateStr < todayStr ? "overdue" : "due today"}.`,
                jobId: j._id,
                read: false
              });
            }
          }
        }
        if (req.user.role === "employee" && pId) {
          const targets = await Target.find({ personId: pId }).populate("serviceId", "name");
          for (const t of targets) {
            const sName = t.serviceId?.name || "Service";
            if (t.completed >= t.quantity && t.quantity > 0) {
              const existing = await Notification.findOne({ userId, targetId: t._id, type: "target_completed" });
              if (!existing) {
                await Notification.create({
                  userId,
                  type: "target_completed",
                  title: "\u{1F389} Target Goal Reached!",
                  message: `Congratulations! You reached your goal of ${t.quantity} ${t.unit} for ${sName}.`,
                  targetId: t._id,
                  read: false
                });
              }
            }
          }
        }
        const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(40);
        const unreadCount = await Notification.countDocuments({ userId, read: false });
        res.json({ notifications, unreadCount });
      } catch (err) {
        res.status(500).json({ error: "Could not fetch notifications", detail: err.message });
      }
    });
    router.patch("/read", async (req, res) => {
      try {
        await Notification.updateMany({ userId: req.user._id, read: false }, { read: true });
        res.json({ success: true });
      } catch (err) {
        res.status(500).json({ error: "Could not mark notifications read", detail: err.message });
      }
    });
    router.patch("/:id/read", async (req, res) => {
      try {
        await Notification.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, { read: true });
        res.json({ success: true });
      } catch (err) {
        res.status(500).json({ error: "Could not mark notification read", detail: err.message });
      }
    });
    router.delete("/", async (req, res) => {
      try {
        await Notification.deleteMany({ userId: req.user._id });
        res.json({ success: true });
      } catch (err) {
        res.status(500).json({ error: "Could not clear notifications", detail: err.message });
      }
    });
    module2.exports = router;
  }
});
// models/SupportTicket.js
var require_SupportTicket = __commonJS({
  "models/SupportTicket.js"(exports2, module2) {
    var mongoose = require("mongoose");
    var SupportTicketSchema = new mongoose.Schema({
      jobId:      { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
      userId:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      userName:   { type: String, required: true },
      userRole:   { type: String, required: true },
      subject:    { type: String, required: true, trim: true },
      message:    { type: String, required: true, trim: true },
      priority:   { type: String, enum: ["Low","Medium","High","Urgent"], default: "Medium" },
      status:     { type: String, enum: ["Open","In Review","Resolved","Closed"], default: "Open" },
      adminReply: { type: String, default: "" },
      repliedAt:  { type: Date, default: null },
      attachments: [{
        name: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: Number, default: 0 },
        type: { type: String, default: "" },
        uploadedAt: { type: Date, default: Date.now }
      }],
      adminAttachments: [{
        name: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: Number, default: 0 },
        type: { type: String, default: "" },
        uploadedAt: { type: Date, default: Date.now }
      }]
    }, { timestamps: true });
    module2.exports = mongoose.model("SupportTicket", SupportTicketSchema);
  }
});

// routes/tickets.js
var require_tickets = __commonJS({
  "routes/tickets.js"(exports2, module2) {
    var express2 = require("express");
    var router = express2.Router();
    var SupportTicket = require_SupportTicket();
    var Job = require_Job();
    var { verifyToken } = require_auth();
    router.use(verifyToken);

    var isManager = (user) => {
      if (!user) return false;
      if (user.role === "superadmin") return true;
      return /mansi/i.test(user.name) || /urna/i.test(user.name);
    };

    router.post("/", async (req, res) => {
      try {
        const { jobId, subject, message, priority, attachments } = req.body;
        if (!jobId || !subject || !message) return res.status(400).json({ error: "jobId, subject, and message are required" });
        const ticket = await SupportTicket.create({
          jobId,
          userId: req.user._id,
          userName: req.user.name,
          userRole: req.user.role,
          subject: subject.trim(),
          message: message.trim(),
          priority: priority || "Medium",
          attachments: (attachments || []).map(att => ({
            name: att.name,
            url: att.url,
            size: Number(att.size) || 0,
            type: att.type || "",
            uploadedAt: att.uploadedAt || new Date()
          }))
        });
        res.status(201).json(ticket);
      } catch (err) { res.status(500).json({ error: err.message }); }
    });

    router.get("/job/:jobId", async (req, res) => {
      try {
        const { jobId } = req.params;
        const filter = { jobId };
        if (isManager(req.user)) {
          const tickets2 = await SupportTicket.find(filter).sort({ createdAt: -1 });
          return res.json(tickets2);
        }
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ error: "Job not found" });

        const isAssignedEmp = req.user.personnelId && job.assignments.some(a => String(a.personId) === String(req.user.personnelId));
        const isOwnerClient = req.user.clientId && String(job.clientId) === String(req.user.clientId);

        if (isAssignedEmp || isOwnerClient) {
          const tickets2 = await SupportTicket.find(filter).sort({ createdAt: -1 });
          return res.json(tickets2);
        }

        filter.userId = req.user._id;
        const tickets = await SupportTicket.find(filter).sort({ createdAt: -1 });
        res.json(tickets);
      } catch (err) { res.status(500).json({ error: err.message }); }
    });

    router.get("/", async (req, res) => {
      try {
        if (isManager(req.user)) {
          const tickets2 = await SupportTicket.find().populate("jobId", "title").sort({ createdAt: -1 });
          return res.json(tickets2);
        }
        if (req.user.role === "employee" && req.user.personnelId) {
          const myJobs = await Job.find({ "assignments.personId": req.user.personnelId }).select("_id");
          const jobIds = myJobs.map(j => j._id);
          const tickets2 = await SupportTicket.find({
            $or: [{ jobId: { $in: jobIds } }, { userId: req.user._id }]
          }).populate("jobId", "title").sort({ createdAt: -1 });
          return res.json(tickets2);
        }
        if (req.user.role === "client" && req.user.clientId) {
          const myJobs = await Job.find({ clientId: req.user.clientId }).select("_id");
          const jobIds = myJobs.map(j => j._id);
          const tickets2 = await SupportTicket.find({
            $or: [{ jobId: { $in: jobIds } }, { userId: req.user._id }]
          }).populate("jobId", "title").sort({ createdAt: -1 });
          return res.json(tickets2);
        }
        const tickets = await SupportTicket.find({ userId: req.user._id }).populate("jobId", "title").sort({ createdAt: -1 });
        res.json(tickets);
      } catch (err) { res.status(500).json({ error: err.message }); }
    });

    router.put("/:id", async (req, res) => {
      try {
        const ticket = await SupportTicket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ error: "Ticket not found" });

        const job = await Job.findById(ticket.jobId);
        const isAssigned = job && req.user.personnelId && job.assignments.some(a => String(a.personId) === String(req.user.personnelId));

        if (!isManager(req.user) && !isAssigned) {
          return res.status(403).json({ error: "Only admins and assigned personnel (Mansi/Urna) can reply or change status" });
        }

        const { status, adminReply, adminAttachments, attachments } = req.body;
        const update = {};
        if (status) update.status = status;
        if (adminReply !== undefined) { update.adminReply = adminReply; update.repliedAt = new Date(); }
        if (adminAttachments !== undefined) update.adminAttachments = adminAttachments;
        if (attachments !== undefined) update.attachments = attachments;
        const updated = await SupportTicket.findByIdAndUpdate(req.params.id, update, { new: true });
        res.json(updated);
      } catch (err) { res.status(500).json({ error: err.message }); }
    });

    router.delete("/:id", async (req, res) => {
      try {
        const ticket = await SupportTicket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ error: "Ticket not found" });
        if (!isManager(req.user) && String(ticket.userId) !== String(req.user._id)) return res.status(403).json({ error: "Not allowed" });
        await ticket.deleteOne();
        res.json({ success: true });
      } catch (err) { res.status(500).json({ error: err.message }); }
    });

    module2.exports = router;
  }
});

// routes/upload.js
var require_upload = __commonJS({
  "routes/upload.js"(exports2, module2) {
    var express2 = require("express");
    var fs2 = require("fs");
    var path2 = require("path");
    var { verifyToken } = require_auth();
    var router = express2.Router();

    var uploadsDir2 = path2.join(__dirname, "uploads");
    if (!fs2.existsSync(uploadsDir2)) {
      fs2.mkdirSync(uploadsDir2, { recursive: true });
    }

    router.post("/", verifyToken, async (req, res) => {
      try {
        const rawFiles = req.body.files || (req.body.file ? [req.body.file] : []);
        if (!rawFiles || !rawFiles.length) {
          return res.status(400).json({ error: "No files provided for upload" });
        }
        const uploaded = [];
        for (const f of rawFiles) {
          const originalName = f.name || `file_${Date.now()}`;
          const ext = path2.extname(originalName) || "";
          const cleanName = path2.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
          const uniqueName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${cleanName}${ext}`;
          const filePath = path2.join(uploadsDir2, uniqueName);

          let buffer = null;
          if (f.base64) {
            const matches = f.base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            const dataStr = matches ? matches[2] : f.base64;
            buffer = Buffer.from(dataStr, "base64");
          } else if (f.data) {
            const matches = f.data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            const dataStr = matches ? matches[2] : f.data;
            buffer = Buffer.from(dataStr, "base64");
          }

          if (buffer) {
            await fs2.promises.writeFile(filePath, buffer);
            uploaded.push({
              name: originalName,
              filename: uniqueName,
              url: `/uploads/${uniqueName}`,
              size: buffer.length || f.size || 0,
              type: f.type || "application/octet-stream",
              uploadedBy: req.user ? req.user.name : "User",
              uploadedAt: new Date()
            });
          } else if (f.url) {
            uploaded.push({
              name: originalName,
              url: f.url,
              size: f.size || 0,
              type: f.type || "application/octet-stream",
              uploadedBy: req.user ? req.user.name : "User",
              uploadedAt: new Date()
            });
          }
        }
        res.json({
          success: true,
          files: uploaded,
          file: uploaded[0] || null
        });
      } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ error: "Failed to process upload: " + err.message });
      }
    });

    module2.exports = router;
  }
});

require("dotenv").config();
var path = require("path");
var fs = require("fs");
var express = require("express");
var cors = require("cors");
var connectDB = require_db();
var app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
connectDB();

var uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use("/uploads", express.static(uploadsPath));

app.use("/api/auth", require_auth2());
app.use("/api/users", require_users());
app.use("/api/personnel", require_personnel());
app.use("/api/clients", require_clients());
app.use("/api/services", require_services());
app.use("/api/jobs", require_jobs());
app.use("/api/roster", require_roster());
app.use("/api/targets", require_targets());
app.use("/api/salary", require_salary());
app.use("/api/dashboard", require_dashboard());
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/tickets", require("./routes/tickets"));
app.use("/api/upload", require_upload());
app.use("/api/tasks", require("./routes/tasks"));

var webDistPath = path.join(__dirname, "../web/dist");
var webSrcPath = path.join(__dirname, "../web");

function getHtmlFile(name) {
  var distFile = path.join(webDistPath, name);
  if (fs.existsSync(distFile)) return distFile;
  var srcFile = path.join(webSrcPath, name);
  if (fs.existsSync(srcFile)) return srcFile;
  return distFile;
}

// Redirect .html URLs to clean extensionless URLs (e.g., /admin.html -> /admin)
app.use((req, res, next) => {
  if (req.method === "GET" && req.path.endsWith(".html")) {
    let cleanPath = req.path.slice(0, -5);
    if (cleanPath === "/index") cleanPath = "/";
    const query = req.url.slice(req.path.length);
    return res.redirect(301, (cleanPath || "/") + query);
  }
  next();
});

// Clean HTML Route shortcuts (without .html extension)
app.get("/login", (req, res) => res.sendFile(getHtmlFile("login.html")));
app.get("/admin", (req, res) => res.sendFile(getHtmlFile("admin.html")));
app.get("/employee", (req, res) => res.sendFile(getHtmlFile("employee.html")));
app.get("/client", (req, res) => res.sendFile(getHtmlFile("client.html")));

if (fs.existsSync(webDistPath)) {
  app.use(express.static(webDistPath));
}
if (fs.existsSync(webSrcPath)) {
  app.use(express.static(webSrcPath));
}

app.get("/", (req, res) => {
  var indexFile = getHtmlFile("index.html");
  if (fs.existsSync(indexFile)) {
    return res.sendFile(indexFile);
  }
  res.sendFile(getHtmlFile("login.html"));
});

app.get("/api/health", (req, res) => res.json({ ok: true, version: "2.2.0-tasks-tickets", routes: ["tasks", "tickets", "jobs", "users", "personnel", "clients"], time: /* @__PURE__ */ new Date() }));

// Fallback for SPA routing
app.get("*", (req, res) => {
  if (req.path.startsWith("/api") || req.path.startsWith("/uploads")) {
    return res.status(404).json({ error: "Endpoint not found" });
  }
  var indexFile = getHtmlFile("index.html");
  if (fs.existsSync(indexFile)) {
    return res.sendFile(indexFile);
  }
  res.sendFile(getHtmlFile("login.html"));
});

var PORT = process.env.PORT || 4e3;
app.listen(PORT, () => console.log(`CI360 backend server running on http://localhost:${PORT}`));
