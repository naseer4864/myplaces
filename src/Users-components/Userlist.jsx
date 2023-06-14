import { Fragment, useState, useEffect } from "react";
import UsersCard from "./User";
import Spinner from "../asset/spinner/spinner";

const UserList = () => {
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/users");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setUsers(responseData.users);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    sendRequest();
  }, []);

  if (!users || users.length === 0) {
    return (
          <div className="user-not-found">
            <p>Users not found!</p>
        </div>
    )
  }
  
  return (
    <Fragment>
      {isLoading && <Spinner />}
      {users.map((user) => (
        <UsersCard key={user.id} user={user} />
      ))}
      <p>{error}</p>
    </Fragment>
  );
};

export default UserList;
