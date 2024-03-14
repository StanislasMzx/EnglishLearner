import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {VideoCameraIcon} from "@heroicons/react/16/solid/index.js";

export default function Builder({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        video: undefined,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('quizz.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Quizz Builder</h2>}
        >
            <Head title="Quizz Builder" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="title" value="Title"/>

                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                isFocused={true}
                                onChange={(e) => setData('title', e.target.value)}
                            />

                            <InputError message={errors.title} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="description" value="Description"/>

                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                autoComplete="description"
                                onChange={(e) => setData('description', e.target.value)}
                            />

                            <InputError message={errors.description} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="video" value="Video"/>

                            <div
                                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                {!data.video ? (
                                    <div className="text-center">
                                        <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-300"
                                                         aria-hidden="true"/>
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative px-2 cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="video"
                                                    type="file"
                                                    accept="video/mp4"
                                                    className="sr-only"
                                                    onChange={(e) => {setData('video', e.target.files[0]);}}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">MP4 up to 100MB</p>
                                    </div>
                                ) : (
                                    <div className="flex-1">
                                        <p className="text-sm text-green-500">{data.video.name}</p>
                                        <div className="flex items-center gap-1 text-xs text-green-500">
                                            <span>{data.video.type}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <InputError message={errors.video} className="mt-2"/>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
