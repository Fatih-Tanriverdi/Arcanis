import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import "../UserDropdownMenu/UserDropdownMenu.css";
import { AiOutlineEdit } from 'react-icons/ai';

export default function UserDropdownMenu({ onEditClick, onDeleteClick }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleEditClick = () => {
        onEditClick();
        toggleMenu();
    };

    const handleDeleteClick = () => {
        onDeleteClick();
        toggleMenu();
    };

    const menu = (
        <Menu>
            <Menu.Item key="edit">
                <button className='editButtonsGroup' onClick={handleEditClick}>Edit</button>
            </Menu.Item>
            <Menu.Item key="delete">
                <button className='editButtonsGroup' onClick={handleDeleteClick}>Delete</button>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="user-dropdown-menu">
            <Dropdown overlay={menu} trigger={['click']} visible={isOpen} onVisibleChange={toggleMenu}>
                <AiOutlineEdit onClick={toggleMenu}/>
            </Dropdown>
        </div>
    );
}