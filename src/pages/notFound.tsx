import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 560, textAlign: "center" }}>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1 }}>404</div>
        <h1 style={{ margin: "8px 0 0" }}>Page not found</h1>
        <p style={{ margin: "10px 0 0", opacity: 0.7 }}>
          The page <code>{location.pathname}</code> doesn’t exist or was moved.
        </p>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <Link to="/users">Go to Dashboard</Link>
          <Link to="/" replace>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
