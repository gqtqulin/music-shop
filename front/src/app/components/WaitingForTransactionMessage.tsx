import React from "react";

type WaitingForTransactionProps = {
    txHash: string;
};

const WaitingForTransactionMessage: React.FunctionComponent<
    WaitingForTransactionProps
> = ({ txHash }) => {
    return (
        <div>
            Waiting for transaction <strong>{txHash}</strong>
        </div>
    );
};

export default WaitingForTransactionMessage;