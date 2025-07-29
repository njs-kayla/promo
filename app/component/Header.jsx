'use client'

import { connect, useSelector } from "react-redux";
import logo_sg from "@/assets/images/spade_logo.png"
import logo_fs from "@/assets/images/logo_fs.svg"
import { useRouter } from 'next/router'
import Link from 'next/link';
import RWD from "@/service/RWD";
import i18n from "@/service/i18n";
import { useEffect, useRef, useState } from "react";

const Header = ({ langList }) => {
    const ref = useRef();
    const { isMobile } = RWD()
    const [showMenu, setShowMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const loading = useSelector((state) => state.loading.value);
    const router = useRouter()

    useEffect(() => {
        console.log(router.pathname);
        // 關閉彈窗事件
        const bodyClick = (event) => {
            if (ref.current && ref.current.contains(event.target)) {
                return;
            } else {
                setShowMenu(false)
            }
        };
        document.body.addEventListener("click", bodyClick);

        const handleScroll = () => {
            if (!isMobile) return;
            if (window.scrollY > 60) {
                setScrolled('scrolled');
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll)
        // component destroy
        return () => {
            document.body.removeEventListener("click", bodyClick);
            window.removeEventListener('scroll', handleScroll)
        };



    }, [isMobile])

    const changeLocale = () => {
        window.scrollTo(0, 0);
        if (isMobile) setShowMenu(false);
    }

    return (
        <header className={`header ${process.env.NEXT_PUBLIC_BRAND} ${scrolled}`}>
            <div className="nav">
                <h2 className={`nav-logo ${process.env.NEXT_PUBLIC_BRAND}`} style={{ backgroundImage: `url(${(process.env.NEXT_PUBLIC_BRAND == 'SG') ? logo_sg.src : logo_fs.src})` }}>
                </h2>
                <div ref={ref} className="language-dropdown dropdown">
                    {isMobile && <div className="default dropdown-btn" onClick={() => setShowMenu(true)}>
                        <i className={`flag ${i18n.language}`}></i>
                    </div>}
                    <ul className={`list dropdown-list ${(isMobile && showMenu) ? 'active' : ''}`} >
                        {langList.map(lang => (
                            <li key={lang}>
                                <Link href={`${window.location.pathname}?lang=${lang}`} onClick={() => changeLocale()} scroll={false}>
                                    <i className={`flag ${lang}`}></i>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header