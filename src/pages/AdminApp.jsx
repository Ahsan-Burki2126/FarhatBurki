import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { useSiteContext } from "../context/SiteContext";
import "./Admin.css";

// ==================== AUTH ====================
const AUTH_KEY = "farhat_admin_token";

function getToken() {
  return localStorage.getItem(AUTH_KEY);
}

function setToken(token) {
  localStorage.setItem(AUTH_KEY, token);
}

function clearToken() {
  localStorage.removeItem(AUTH_KEY);
}

function isAuthenticated() {
  return !!getToken();
}

// ==================== LOGIN ====================
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // Fallback for demo mode
        if (
          email === "admin@farhat.com" &&
          password === "portfolio.farhat3636##"
        ) {
          const token = "demo_token_" + Date.now();
          setToken(token);
          onLogin();
          return;
        }
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      setToken(data.token);
      onLogin();
    } catch (err) {
      // Demo mode fallback
      if (email === "admin@farhat.com" && password === "admin123") {
        const token = "demo_token_" + Date.now();
        setToken(token);
        onLogin();
        return;
      }
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-logo">
            FARHAT<span className="dot">.</span>
          </h1>
          <p className="login-subtitle">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="login-hint">Demo: admin@farhat.com / admin123</p>
        </form>
      </div>
    </div>
  );
}

// ==================== SIDEBAR ====================
function Sidebar({ onLogout }) {
  const location = useLocation();

  const links = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/projects", label: "Projects", icon: "🎬" },
    { path: "/admin/homepage", label: "Homepage", icon: "🏠" },
    { path: "/admin/about", label: "About", icon: "👤" },
    { path: "/admin/services", label: "Services", icon: "💼" },
    { path: "/admin/media", label: "Media Library", icon: "🖼️" },
    { path: "/admin/animations", label: "Animations", icon: "✨" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <Link to="/admin">
          FARHAT<span className="dot">.</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${location.pathname === link.path ? "active" : ""}`}
          >
            <span className="sidebar-icon">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="sidebar-link" target="_blank">
          <span className="sidebar-icon">🌐</span>
          <span>View Site</span>
        </Link>
        <button className="sidebar-link logout-btn" onClick={onLogout}>
          <span className="sidebar-icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

// ==================== DASHBOARD ====================
function DashboardPage() {
  const stats = [
    { label: "Total Projects", value: "24", change: "+3 this month" },
    { label: "Media Files", value: "156", change: "2.4 GB used" },
    { label: "Contact Messages", value: "12", change: "5 unread" },
    { label: "Page Views", value: "8.2K", change: "+12% this week" },
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back, here's your overview.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span className="stat-card-value">{stat.value}</span>
            <span className="stat-card-label">{stat.label}</span>
            <span className="stat-card-change">{stat.change}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Recent Projects</h3>
          <div className="recent-list">
            {["Midnight Echoes", "Velocity", "Pulse"].map((name) => (
              <div key={name} className="recent-item">
                <span className="recent-dot" />
                <span>{name}</span>
                <span className="recent-date">2 days ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Recent Messages</h3>
          <div className="recent-list">
            {[
              { from: "John D.", subject: "YouTube series inquiry" },
              { from: "Sarah M.", subject: "Wedding film editing" },
              { from: "Brand Co.", subject: "Commercial project" },
            ].map((msg) => (
              <div key={msg.from} className="recent-item">
                <span className="recent-dot recent-dot--blue" />
                <div>
                  <span className="recent-from">{msg.from}</span>
                  <span className="recent-subject">{msg.subject}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== PROJECTS ====================
function ProjectsPage() {
  const { categories, projects, setProjects } = useSiteContext();
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleToggleFeatured = (id) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)),
    );
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p>Manage your portfolio projects</p>
        </div>
        <button
          className="admin-btn primary"
          onClick={() => {
            setEditProject(null);
            setShowModal(true);
          }}
        >
          + Add Project
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="table-title">{project.title}</td>
                <td>
                  <span className="table-badge">{project.category}</span>
                </td>
                <td>
                  <button
                    className={`toggle-btn ${project.featured ? "on" : ""}`}
                    onClick={() => handleToggleFeatured(project.id)}
                  >
                    <span className="toggle-knob" />
                  </button>
                </td>
                <td>
                  <span className={`status-badge ${project.status}`}>
                    {project.status}
                  </span>
                </td>
                <td className="table-actions">
                  <button
                    className="action-btn"
                    onClick={() => {
                      setEditProject(project);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ProjectModal
          project={editProject}
          categories={categories}
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            if (editProject) {
              setProjects(
                projects.map((p) =>
                  p.id === editProject.id ? { ...p, ...data } : p,
                ),
              );
            } else {
              setProjects([
                ...projects,
                { ...data, id: Date.now(), status: "draft" },
              ]);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

function ProjectModal({ project, categories, onClose, onSave }) {
  const [form, setForm] = useState({
    title: project?.title || "",
    category: project?.category || categories[0]?.label || "",
    description: project?.description || "",
    featured: project?.featured || false,
    youtubeId: project?.youtubeId || "",
  });

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{project ? "Edit Project" : "New Project"}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="form-field">
            <label>Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.label}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>Description</label>
            <textarea
              rows="3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div className="form-field">
            <label>YouTube Video ID</label>
            <input
              value={form.youtubeId}
              onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
              placeholder="e.g. dQw4w9WgXcQ"
            />
            <span className="form-hint">
              The ID from the YouTube URL: youtube.com/watch?v=
              <strong>VIDEO_ID</strong>
            </span>
          </div>
          {form.youtubeId && (
            <div className="form-field">
              <label>Preview</label>
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  borderRadius: 8,
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${form.youtubeId}`}
                  title="Preview"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          <div className="form-field checkbox-field">
            <label>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />
              Featured Project
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <button className="admin-btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="admin-btn primary" onClick={() => onSave(form)}>
            {project ? "Update" : "Create"} Project
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== HOMEPAGE ====================
function HomepagePage() {
  const { heroYoutubeId, setHeroYoutubeId } = useSiteContext();
  const [heroText1, setHeroText1] = useState("I DON'T EDIT VIDEOS");
  const [heroText2, setHeroText2] = useState("I CREATE EXPERIENCES");
  const [subtitle, setSubtitle] = useState(
    "Cinematic Video Editor — Crafting Visual Stories That Move People",
  );

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Homepage Settings</h1>
        <p>Control the hero section and homepage content</p>
      </div>

      <div className="admin-card">
        <h3>Hero Section</h3>
        <div className="form-field">
          <label>Hero Line 1</label>
          <input
            value={heroText1}
            onChange={(e) => setHeroText1(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Hero Line 2</label>
          <input
            value={heroText2}
            onChange={(e) => setHeroText2(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Subtitle</label>
          <input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Hero Background YouTube Video ID</label>
          <input
            value={heroYoutubeId}
            onChange={(e) => setHeroYoutubeId(e.target.value)}
            placeholder="e.g. dQw4w9WgXcQ"
          />
          <span className="form-hint">
            The ID from the YouTube URL: youtube.com/watch?v=
            <strong>VIDEO_ID</strong>
          </span>
        </div>
        {heroYoutubeId && (
          <div className="form-field">
            <label>Preview</label>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: 8,
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${heroYoutubeId}?autoplay=0`}
                title="Hero Preview"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
        <button className="admin-btn primary">Save Changes</button>
      </div>
    </div>
  );
}

// ==================== ABOUT ====================
function AboutPage() {
  const [milestones, setMilestones] = useState([
    {
      year: "2018",
      title: "The Spark",
      description: "Picked up my first camera...",
    },
    {
      year: "2019",
      title: "First Client",
      description: "Landed my first commercial project...",
    },
    {
      year: "2020",
      title: "Going Pro",
      description: "Went full-time as a video editor...",
    },
  ]);

  const handleAdd = () => {
    setMilestones([...milestones, { year: "", title: "", description: "" }]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const handleRemove = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>About Page</h1>
          <p>Edit your story and timeline</p>
        </div>
        <button className="admin-btn primary" onClick={handleAdd}>
          + Add Milestone
        </button>
      </div>

      <div className="admin-card">
        <h3>Bio</h3>
        <div className="form-field">
          <label>Description</label>
          <textarea
            rows="4"
            defaultValue="I believe every frame tells a story..."
          />
        </div>
        <button className="admin-btn primary">Save Bio</button>
      </div>

      <div className="admin-card">
        <h3>Timeline Milestones</h3>
        {milestones.map((m, i) => (
          <div key={i} className="milestone-edit-row">
            <div className="form-field small">
              <label>Year</label>
              <input
                value={m.year}
                onChange={(e) => handleUpdate(i, "year", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Title</label>
              <input
                value={m.title}
                onChange={(e) => handleUpdate(i, "title", e.target.value)}
              />
            </div>
            <div className="form-field wide">
              <label>Description</label>
              <input
                value={m.description}
                onChange={(e) => handleUpdate(i, "description", e.target.value)}
              />
            </div>
            <button
              className="action-btn delete"
              onClick={() => handleRemove(i)}
            >
              ×
            </button>
          </div>
        ))}
        <button className="admin-btn primary" style={{ marginTop: 16 }}>
          Save Timeline
        </button>
      </div>
    </div>
  );
}

// ==================== SERVICES ====================
function ServicesPage() {
  const { categories, addCategory, removeCategory } = useSiteContext();
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = () => {
    const name = newCategoryName.trim();
    if (!name) return;
    addCategory(name);
    setNewCategoryName("");
  };

  const handleRemoveCategory = (id) => {
    if (
      window.confirm("Remove this category from both Services and Projects?")
    ) {
      removeCategory(id);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1>Services & Categories</h1>
          <p>Manage categories shared across Services and Projects</p>
        </div>
      </div>

      <div className="admin-card">
        <h3>Categories</h3>
        <p className="card-desc">
          These categories are shared between the Services section and the
          Projects section on the site.
        </p>

        <div className="category-list">
          {categories.map((cat) => (
            <div key={cat.id} className="category-row">
              <span className="table-badge">{cat.label}</span>
              <button
                className="action-btn delete"
                onClick={() => handleRemoveCategory(cat.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div
          className="category-add-row"
          style={{ display: "flex", gap: 8, marginTop: 16 }}
        >
          <input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New category name..."
            onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
          />
          <button className="admin-btn primary" onClick={handleAddCategory}>
            + Add Category
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== MEDIA LIBRARY ====================
function MediaPage() {
  const [files, setFiles] = useState([
    { id: 1, name: "hero-reel.mp4", type: "video", size: "45 MB" },
    { id: 2, name: "midnight-echoes.mp4", type: "video", size: "120 MB" },
    { id: 3, name: "thumbnail-1.jpg", type: "image", size: "2.1 MB" },
    { id: 4, name: "velocity-final.mp4", type: "video", size: "89 MB" },
    { id: 5, name: "thumbnail-2.jpg", type: "image", size: "1.8 MB" },
  ]);

  const handleDrop = (e) => {
    e.preventDefault();
    // Handle file drop
    const droppedFiles = Array.from(e.dataTransfer?.files || []);
    const newFiles = droppedFiles.map((f, i) => ({
      id: Date.now() + i,
      name: f.name,
      type: f.type.startsWith("video") ? "video" : "image",
      size: (f.size / (1024 * 1024)).toFixed(1) + " MB",
    }));
    setFiles([...newFiles, ...files]);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Media Library</h1>
        <p>Upload and manage your assets</p>
      </div>

      <div
        className="media-dropzone"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="dropzone-content">
          <span className="dropzone-icon">📁</span>
          <p>Drag & drop files here</p>
          <span className="dropzone-hint">
            or click to browse (Videos & Images)
          </span>
          <input
            type="file"
            multiple
            accept="video/*,image/*"
            className="upload-input"
          />
        </div>
      </div>

      <div className="media-grid">
        {files.map((file) => (
          <div key={file.id} className="media-item">
            <div className={`media-thumb ${file.type}`}>
              {file.type === "video" ? "🎬" : "🖼️"}
            </div>
            <div className="media-info">
              <span className="media-name">{file.name}</span>
              <span className="media-size">{file.size}</span>
            </div>
            <button
              className="action-btn delete"
              onClick={() => setFiles(files.filter((f) => f.id !== file.id))}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== ANIMATIONS ====================
function AnimationsPage() {
  const [settings, setSettings] = useState({
    smoothScroll: true,
    heroAnimation: true,
    scrollTrigger: true,
    cursorEffects: true,
    filmGrain: true,
    parallax: true,
    textReveal: true,
    reduceMotion: false,
    preloader: true,
  });

  const toggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Animation Controls</h1>
        <p>Toggle animations and motion effects</p>
      </div>

      <div className="admin-card">
        <h3>Animation Settings</h3>
        <div className="animation-toggles">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="toggle-row">
              <div>
                <span className="toggle-label">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase())}
                </span>
              </div>
              <button
                className={`toggle-btn ${value ? "on" : ""}`}
                onClick={() => toggle(key)}
              >
                <span className="toggle-knob" />
              </button>
            </div>
          ))}
        </div>
        <button className="admin-btn primary" style={{ marginTop: 24 }}>
          Save Settings
        </button>
      </div>

      <div className="admin-card">
        <h3>Performance Mode</h3>
        <p className="card-desc">
          Enable reduced motion for visitors who prefer less animation.
        </p>
        <div className="toggle-row">
          <span className="toggle-label">Reduce Motion (Accessibility)</span>
          <button
            className={`toggle-btn ${settings.reduceMotion ? "on" : ""}`}
            onClick={() => toggle("reduceMotion")}
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN ADMIN APP ====================
function AdminApp() {
  const [authed, setAuthed] = useState(isAuthenticated());
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    setAuthed(false);
  };

  if (!authed) {
    return <LoginPage onLogin={() => setAuthed(true)} />;
  }

  return (
    <div className="admin-layout">
      <Sidebar onLogout={handleLogout} />
      <main className="admin-main">
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="homepage" element={<HomepagePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="animations" element={<AnimationsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminApp;
