import React, { useContext } from "react";
import AlertMessagesContext from "./AlertMessagesContext";

function AlertMessages() {
	const { alertMessages, setAlertMessages } = useContext(AlertMessagesContext);

	function deleteMessage(delMessage) {
		setAlertMessages((messages) => {
			if (messages.length > 1) {
				return messages.filter((msg) => msg.id !== delMessage.id);
			}
			return [];
		});
	}

	return (
		<div className="container-fluid">
			{alertMessages.length > 0
				? alertMessages.map((message) => (
						<div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
							{message.msg}
							<button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => deleteMessage(message)}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
				  ))
				: null}
		</div>
	);
}

export default AlertMessages;
