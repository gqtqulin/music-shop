import React from "react";

type TransactionErrorMesageProps = {
    message: string;
    dismiss: React.MouseEventHandler<HTMLButtonElement>;
};

const TransactionErrorMessage: React.FunctionComponent<
    TransactionErrorMesageProps
> = ({ message, dismiss }) => {
    return (
        <div>
            TX error: {message}
            <button type="button" onClick={dismiss}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

export default TransactionErrorMessage;