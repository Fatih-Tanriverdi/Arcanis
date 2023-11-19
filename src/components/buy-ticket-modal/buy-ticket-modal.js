import { useState } from 'react';
import './buy-ticket-modal.css';
import { Button, Modal } from 'antd';

export default function BuyTicketModal({ visible }) {

    const [open, setOpen] = useState(false);

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(true);
    };

    return (
        <div className='buyTicketModalContainer'>
            <Modal
                className='buyTicketModal'
                centered
                visible={visible}
                onOk={handleOk}
                footer={[
                    <Button className='buyTicketModalButton' key="ok" type="primary" onClick={handleOk}>
                        Gönder
                    </Button>,
                ]}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </div>
    )
}
