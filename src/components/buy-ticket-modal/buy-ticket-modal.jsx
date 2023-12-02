import { useState } from 'react';
import './buy-ticket-modal.css';
import { Button, Input, Modal, message } from 'antd';
import FloatLabel from '../float-label/float-label';
import { postData } from '../../services/BaseApiOperations';
import Config from "../../config-file.json";

export default function BuyTicketModal({ visible, onClose, ticketId }) {

    const [open, setOpen] = useState(false);
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpıryDate, setCardExpıryDate] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [seatNumber, setSeatNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleOk = async () => {
        try {
            if (!cardName || !cardNumber || !cardExpıryDate || !cardCvv || !seatNumber) {
                setErrorMessage("Lütfen tüm kart bilgilerini eksiksiz girin.");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);

                return;
            }
            const ticketSalesData = {
                expeditionId: ticketId,
                seatNumber: parseInt(seatNumber),
                creditCardModel: {
                    holderName: cardName,
                    number: cardNumber.replace(/-/g, ''),
                    securityMonth: parseInt(cardExpıryDate.substring(0, 2), 10),
                    securityYear: parseInt(cardExpıryDate.substring(3, 5), 10),
                    cvv: parseInt(cardCvv, 10),
                },
            };
            const data = ticketSalesData;
            const url = `${Config.SERVICE_URL}/ticket-sales/buy-ticket`;
            const response = await postData(url, data);
            setOpen(false);
            onClose();

            if (response.isSuccess) {
                message.success({
                    content: 'Bilet satın alma işleminiz başarıyla gerçekleşmiştir.',
                    duration: 3,
                    onClose: () => {
                        window.location.reload();
                    }
                });
            }
        } catch (error) {
            setErrorMessage(error.message);
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };

    const handleCancel = () => {
        setOpen(true);
        onClose();
    };

    const maskCardNumber = (cardNumber) => {
        const cleanedNumber = cardNumber.replace(/\D/g, '').slice(0, 16);
        const maskedNumber = cleanedNumber.replace(/(.{4})/g, '$1-').slice(0, 19);
        return maskedNumber;
    };

    return (
        <div className='buyTicketModalContainer'>
            {visible && (
                <>
                    <div className='overlay' onClick={handleCancel}></div>
                    <Modal
                        className='buyTicketModal'
                        centered
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <div className='paymentScreenContainer'>
                            <h1>Ödeme Ekranı</h1>
                            <FloatLabel label="İsim Soyisim" name="cardName" value={cardName}>
                                <Input
                                    className='paymentCardName'
                                    value={cardName}
                                    onChange={(e) => setCardName(e.target.value)}
                                />
                            </FloatLabel>
                            <FloatLabel label="Kart Numarası" name="cardNumber" value={cardNumber}>
                                <Input
                                    className='paymentCardNumber'
                                    value={maskCardNumber(cardNumber)}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    type='text'
                                />
                            </FloatLabel>
                            <div className='paymentScreenCVV'>
                                <FloatLabel label="Son Kullanma Tarihi" name="cardExpıryDate" value={cardExpıryDate}>
                                    <Input
                                        className='paymentCardExpıryDate'
                                        type='text'
                                        value={cardExpıryDate}
                                        onChange={(e) => {
                                            const formattedDate = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                                            if (formattedDate.length <= 2) {
                                                setCardExpıryDate(formattedDate);
                                            } else {
                                                setCardExpıryDate(`${formattedDate.slice(0, 2)}/${formattedDate.slice(2)}`);
                                            }
                                        }}
                                    />
                                </FloatLabel>
                                <FloatLabel label="CVV" name="cardCvv" value={cardCvv}>
                                    <Input
                                        className='paymentCardCVV'
                                        type='number'
                                        value={cardCvv}
                                        onChange={(e) => setCardCvv(e.target.value.slice(0, 3))}
                                    />
                                </FloatLabel>
                            </div>
                            <div className='paymentSeatNumberContainer'>
                                <FloatLabel label="Koltuk Numarası" name="seatNumber" value={seatNumber}>
                                    <Input
                                        className='paymentSeatNumber'
                                        value={seatNumber}
                                        onChange={(e) => setSeatNumber(e.target.value)}
                                        type='number'
                                    />
                                </FloatLabel>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <Button className='buyTicketModalButton' key="ok" type="primary" onClick={handleOk}>
                                Satın Al
                            </Button>
                        </div>
                        {errorMessage && (
                            <div className='errorMessageBuyTicket'>
                                {errorMessage}
                            </div>
                        )}
                    </Modal>
                </>
            )}
        </div>
    )
}