import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import axios from "axios";

function useUser() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserFromMongo(user) {
      if (!user) return;
      try {
        const response = await axios.get(`/api/v1/patients/fetch/${user.uid}`);
        if (response.status == 200) {
          setUser(response.data);
        }
      } catch (e) {
        alert("Error getting user info.\nPlease try again.");
      }
    }

    const unsubscribe = onAuthStateChanged(getAuth(), async user => {
      await fetchUserFromMongo(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, isLoading }
}

export default useUser