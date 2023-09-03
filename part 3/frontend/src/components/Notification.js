const Notification = ({ message, type }) => {
  if (message === null || type === null) {
    return null;
  }
  const styling =
    type === "ADDED" || type === "UPDATED" || type === "DELETED"
      ? "serverOK"
      : "error";

  return <div className={styling}>{message}</div>;
};

export default Notification;
