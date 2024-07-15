import { useDispatch, useSelector } from "react-redux";
import NotificationsSystem, { dismissNotification, wyboTheme } from "reapop";

const ReactNotifications = () => {

    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications);

    return (
        <div>
            <NotificationsSystem
                notifications={notifications}
                dismissNotification={(id) => dispatch(dismissNotification(id))}
                theme={wyboTheme}
            />
        </div>
    );
};

export default ReactNotifications;
