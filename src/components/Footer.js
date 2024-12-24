import React from 'react';

const Footer = () => {
    return (
        <div className="w-full  bottom-0 rounded-lg bg-white px-8 text-gray-700 shadow-lg dark:bg-zinc-900 dark:text-zinc-400 lg:flex-row">
            <div className="flex w-full flex-col justify-between py-2 md:items-center lg:flex-row">
                <div className="flex items-center md:px-4">
                    <div className="flex h-10 w-18 items-center text-lg font-bold text-gray-700 dark:text-zinc-500">
                        <span className="text-base">e-commerce</span>
                    </div>
                </div>
                <div className="text-xxs text-gray-400 md:text-sm">&#169; e-commerce , All rights reserved</div>
            </div>
        </div>
    );
}

export default Footer;