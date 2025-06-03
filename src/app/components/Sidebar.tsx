"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SidebarItemMenu } from './SidebarItemMenu';
import { IoPeopleOutline, IoFilmOutline, IoBusinessOutline, IoTicketOutline, IoArrowUndoCircle, IoDocumentTextOutline, IoTime } from 'react-icons/io5';

const menuItems = [
    {
        path:'/admin/users',
        icon:<IoPeopleOutline/>,
        title:'Usuarios',
        subTitle:'Gestión de usuarios'
    },
    {
        path:'/admin/movies',
        icon:<IoFilmOutline/>,
        title:'Películas',
        subTitle:'Gestión de películas'
    },
    {
        path:'/admin/functions',
        icon:<IoTime/>,
        title:'Funciones',
        subTitle:'Gestión de funciones'
    },
    {
        path:'/admin/rooms',
        icon:<IoBusinessOutline/>,
        title:'Salas',
        subTitle:'Gestión de salas'
    },
    {
        path:'/admin/tickets',
        icon:<IoTicketOutline/>,
        title:'Boletos',
        subTitle:'Gestión de boletos'
    },
    {
        path:'/admin/reports',
        icon:<IoDocumentTextOutline/>,
        title:'Reportes',
        subTitle:'Generación de reportes'
    }
];
    function getMenuItemsByRole(role: string | null) {
        if (role === 'admin') {
            return menuItems;
        }
        if (role === 'seller') {
            return menuItems.filter(item =>
                ['Películas', 'Funciones', 'Salas', 'Boletos'].includes(item.title)
            );
        }
        if (role === 'client') {
            return menuItems.filter(item =>
                ['Películas', 'Funciones', 'Salas'].includes(item.title)
            );
        }
        return [];
    }

export const Sidebar = () => {
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);
       useEffect(() => {
        if (typeof window !== "undefined") {
            setUserRole(localStorage.getItem('userRole'));
        }
    }, []);

    const menuItems = getMenuItemsByRole(userRole);

    const handleSignOut = async () => {
        try {
            const token = localStorage.getItem('token');
            await fetch('http://localhost:3000/api/auth/signout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            localStorage.removeItem('token');
            router.push('/login');
        } catch {
            alert('Error al cerrar sesión');
        }
    };

    return (
        <div
            id="menu"
            className="bg-black fixed top-0 left-0 z-10 text-slate-300 w-64 h-screen flex flex-col"
        >
            {/* Logo y panel */}
            <div id="logo" className="my-4 px-6">
                <h1 className="text-lg md:text-2xl font-bold text-white">
                    Alpha<span className="text-blue-500">Movie</span>.
                </h1>
                <p className="text-slate-500 text-sm">Panel de administración</p>
            </div>
            {/* Perfil */}

            <div id="profile" className="px-6 py-6">
                <p className="text-slate-500">Bienvenido,</p>
                <span className="inline-flex space-x-2 items-center">
                    <span className="text-sm md:text-base font-bold text-white">
                        {!userRole
                            ? ''
                            : userRole === 'admin'
                                ? 'Administrador'
                                : userRole === 'seller'
                                    ? 'Vendedor'
                                    : userRole === 'client'
                                        ? 'Cliente'
                                        : 'Usuario'}
                    </span>
                </span>
            </div>
            {/* Navegación */}
            <nav className="flex-1 px-4 py-2 space-y-2">
                {menuItems.map((item) => (
                    <SidebarItemMenu
                        key={item.path}
                        path={item.path}
                        icon={item.icon}
                        title={item.title}
                        subTitle={item.subTitle}
                    />
                ))}
            </nav>
            {/* Botón cerrar sesión */}
            <div className="mt-auto px-6 pb-8">
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
                >
                    <IoArrowUndoCircle className="text-xl" />
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};