import React, { useState } from 'react';
import './PasswordResetScreen.css';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Button, Input } from 'antd';
import { useParams } from 'react-router-dom';
import { passwordResetKey } from '../../services/authService';

export default function PasswordResetScreen() {

    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const { recoveryCode } = useParams();
    const [error, setError] = useState('');

    const handlePasswordReset = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (password && rePassword && recoveryCode) {
            if (passwordRegex.test(password)) {
                passwordResetKey(password, rePassword, recoveryCode);
            } else if (passwordRegex.test(rePassword)) {
                passwordResetKey(password, rePassword, recoveryCode);
            } else {
                setError('Şifre en az 6 karakterden oluşmalı ve büyük küçük harf içermelidir.');
                setTimeout(() => {
                    setError('');
                }, 3000);
            }
        } else {
            setError('Hata');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    return (
        <div className='PasswordResetContainer'>
            <div className='PasswordResetBody'>
                <h1 className='PasswordResetTitle'>Şifre Sıfırlama</h1>
                <div className='PasswordReserInputGroup'>
                    <Input.Password
                        className='loginPagePasswordInput'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        prefix={<RiLockPasswordLine />}
                        placeholder="Yeni Şifrenizi Giriniz"
                    />
                    <br />
                    <Input.Password
                        className='loginPagePasswordInput'
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        prefix={<RiLockPasswordLine />}
                        placeholder="Şifrenizi Tekrar Giriniz"
                    />
                    <Button className='PasswordResetButton' onClick={handlePasswordReset}>Gönder</Button>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
        </div>
    )
}
