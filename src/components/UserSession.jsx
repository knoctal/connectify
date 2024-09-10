import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function UserSession() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) {
          navigate("/login");
        } else {
          navigate("/home");
        }
      } catch (err) {
        console.error("An error occurred while checking the session:", err);
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  return null;
}
