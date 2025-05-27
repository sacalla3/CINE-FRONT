import Image from 'next/image';
import { SidebarItemMenu } from './SidebarItemMenu';
import { IoBookOutline, IoBrowsersOutline, IoCalculatorOutline } from 'react-icons/io5';

const menuItems = [
    {
        path:'/dashboard/main',
        icon:<IoBrowsersOutline/>,
        title:'Dashboard',
        subTitle:'Main Page'
    },
    {
        path:'/dashboard/counter',
        icon:<IoCalculatorOutline/>,
        title:'Counter',
        subTitle:'Counter Page'
    },
    {
        path:'/dashboard/students',
        icon:<IoBookOutline/>,
        title:'Students',
        subTitle:'Student Page'
    }
]


export const Sidebar = () => {
    return (
        <div
            style={{ width: '400px' }}
            id="menu" className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64  left-0 h-screen overflow-y-scroll">
            <div id="logo" className="my-4 px-6">
                <h1 className="text-lg md:text-2xl font-bold text-white">Dash<span className="text-blue-500">Students</span>.</h1>
                <p className="text-slate-500 text-sm">Manage your students population</p>
            </div>
            <div id="profile" className="px-6 py-10">
                <p className="text-slate-500">Welcome back,</p>
                <a href="#" className="inline-flex space-x-2 items-center">
                    <span>
                        <Image
                            src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c"
                            className="rounded-full w-8 h-8"
                            width={50}
                            height={50}
                            alt="avatar" />
                    </span>
                    <span className="text-sm md:text-base font-bold">
                        Gus Gonzalez
                    </span>
                </a>
            </div>
            <div id="nav" className="w-full px-6">
               
               {
                menuItems.map( item => (
                    <SidebarItemMenu key={item.path} {...item}/>
                ))
               }

            </div>
        </div>
    )
}
