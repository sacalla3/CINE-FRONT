import Image from 'next/image';
import { SidebarItemMenu } from './SidebarItemMenu';
import { IoPeopleOutline, IoFilmOutline, IoCalendarOutline, IoBusinessOutline, IoTicketOutline, IoArrowUndoCircle, IoDocumentTextOutline, IoTime } from 'react-icons/io5';
import path from 'path';

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
        path:'/admin/theatre',
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
export const Sidebar = () => {
    return (
        <div
            id="menu" className="bg-black fixed top-0 left-0 z-10 text-slate-300 w-64 h-screen flex flex-col">
            <div id="logo" className="my-4 px-6">
                <h1 className="text-lg md:text-2xl font-bold text-white">Alpha<span className="text-blue-500">Movie</span>.</h1>
                <p className="text-slate-500 text-sm">Panel de administración</p>
            </div>
            <div id="profile" className="px-6 py-10">
                <p className="text-slate-500">Bienvenido,</p>
                <a href="#" className="inline-flex space-x-2 items-center">
                    <span className="text-sm md:text-base font-bold">
                        Admin
                    </span>
                </a>
            </div>
            <div id="nav" className="w-full px-6">
               {
                menuItems.map(item => (
                    <SidebarItemMenu key={item.path} {...item}/>
                ))
               }
            </div>
        </div>
    )
}
