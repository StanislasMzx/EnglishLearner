import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

export default function Dashboard({ auth, quizzes }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Quizzes</h2>}
        >
            <Head title="Quizzes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ul role="list"
                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {quizzes.map((quizz, index) => (
                            <li key={index} className="relative">
                                <div
                                    className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                                    <img src={quizz.thumbnail} alt=""
                                         className="object-cover pointer-events-none group-hover:opacity-75"/>
                                    <Link type="button" className="absolute inset-0 focus:outline-none" href={route('quizz.show', {id: quizz.id})}>
                                        <span className="sr-only">View details for {quizz.created_at}</span>
                                    </Link>
                                </div>
                                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{quizz.title}</p>
                                <p className="block text-sm font-medium text-gray-500 pointer-events-none">{quizz.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
