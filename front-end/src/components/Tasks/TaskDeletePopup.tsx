export default function TaskDeletePopup() {

    return (
        <div className="task-delete-popup">
            <div className="task-delete-popup__content">
                <h2>Are you sure you want to delete this task?</h2>
                <div className="task-delete-popup__content__buttons">
                    <button className="button button--cancel">Cancel</button>
                    <button className="button button--confirm">Confirm</button>
                </div>
            </div>
        </div>
    );
}