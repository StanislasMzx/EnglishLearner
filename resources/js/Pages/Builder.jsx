import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import { VideoCameraIcon, PhotoIcon } from "@heroicons/react/16/solid/index.js";
import Modal from "@/Components/Modal.jsx";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import DangerButton from "@/Components/DangerButton.jsx";

export default function Builder({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        textFields: [],
        radioButtonsFields: [],
        video: undefined,
        thumbnail: undefined,
    });

    const [openTextQuestionModal, setOpenTextQuestionModal] = useState(false);
    const [openSQuestionModal, setOpenSQuestionModal] = useState(false);
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionPlaceholder, setQuestionPlaceholder] = useState("");
    const [questionAnswer, setQuestionAnswer] = useState("");
    const [questionIndex, setQuestionIndex] = useState(1);
    const [questionCorrect, setQuestionCorrect] = useState(false);
    const [questionChoices, setQuestionChoices] = useState([]);

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("quizz.store"));
    };

    function countRightAnswers() {
        let res = 0;
        for (let choice of questionChoices) {
            if (choice.is_correct) {
                res++;
            }
        }
        return res;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Quizz Builder
                </h2>
            }
        >
            <Head title="Quizz Builder" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={submit}>
                        {/* Video inputs */}
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Video
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Please upload the video that the quiz
                                        will be based on, along with general
                                        information.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div>
                                            <InputLabel
                                                htmlFor="title"
                                                value="Title*"
                                            />

                                            <TextInput
                                                id="title"
                                                type="text"
                                                name="title"
                                                value={data.title}
                                                className="mt-1 block w-full"
                                                autoComplete="title"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.title}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="description"
                                                value="Description*"
                                            />

                                            <textarea
                                                id="description"
                                                name="description"
                                                value={data.description}
                                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                                autoComplete="description"
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.description}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="media"
                                                value="Medium*"
                                            />

                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                {!data.video ? (
                                                    <div className="text-center">
                                                        <VideoCameraIcon
                                                            className="mx-auto h-12 w-12 text-gray-300"
                                                            aria-hidden="true"
                                                        />
                                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                            >
                                                                <span>
                                                                    Upload a
                                                                    file
                                                                </span>
                                                                <input
                                                                    id="file-upload"
                                                                    name="video"
                                                                    type="file"
                                                                    accept="video/mp4,audio/mp3"
                                                                    className="sr-only"
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        setData(
                                                                            "video",
                                                                            e
                                                                                .target
                                                                                .files[0],
                                                                        );
                                                                    }}
                                                                />
                                                            </label>
                                                            <p className="pl-1">
                                                                or drag and drop
                                                            </p>
                                                        </div>
                                                        <p className="text-xs leading-5 text-gray-600">
                                                            MP4 or MP3 up to
                                                            100MB
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="flex-1">
                                                        <p className="text-sm text-green-500">
                                                            {data.video.name}
                                                        </p>
                                                        <div className="flex items-center gap-1 text-xs text-green-500">
                                                            <span>
                                                                {
                                                                    data.video
                                                                        .type
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <InputError
                                                message={errors.video}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="thumbnail"
                                                value="Thumbnail"
                                            />

                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                                {!data.thumbnail ? (
                                                    <div className="text-center">
                                                        <PhotoIcon
                                                            className="mx-auto h-12 w-12 text-gray-300"
                                                            aria-hidden="true"
                                                        />
                                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                            <label
                                                                htmlFor="thumbnail-upload"
                                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                            >
                                                                <span>
                                                                    Upload a
                                                                    file
                                                                </span>
                                                                <input
                                                                    id="thumbnail-upload"
                                                                    name="thumbnail"
                                                                    type="file"
                                                                    accept="image/jpeg,image/png"
                                                                    className="sr-only"
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        setData(
                                                                            "thumbnail",
                                                                            e
                                                                                .target
                                                                                .files[0],
                                                                        );
                                                                    }}
                                                                />
                                                            </label>
                                                            <p className="pl-1">
                                                                or drag and drop
                                                            </p>
                                                        </div>
                                                        <p className="text-xs leading-5 text-gray-600">
                                                            JPEG or PNG up to
                                                            40MB
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="flex-1">
                                                        <p className="text-sm text-green-500">
                                                            {
                                                                data.thumbnail
                                                                    .name
                                                            }
                                                        </p>
                                                        <div className="flex items-center gap-1 text-xs text-green-500">
                                                            <span>
                                                                {
                                                                    data
                                                                        .thumbnail
                                                                        .type
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <InputError
                                                message={errors.thumbnail}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Line break */}
                        <div className="hidden sm:block" aria-hidden="true">
                            <div className="py-5">
                                <div className="border-t border-gray-200" />
                            </div>
                        </div>

                        {/* Questions inputs */}
                        <div className="mt-10 sm:mt-0">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            Questions
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Fill in the quiz elements
                                            (questions, answers, etc.)
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="bg-gray-50 px-4 py-5 rounded-t-lg border-b border-gray-200 sm:px-6">
                                                <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                                                    <div className="ml-4 mt-2">
                                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                            Text questions
                                                        </h3>
                                                    </div>
                                                    <div className="ml-4 mt-2 flex-shrink-0">
                                                        <button
                                                            type="button"
                                                            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                            onClick={() =>
                                                                setOpenTextQuestionModal(
                                                                    true,
                                                                )
                                                            }
                                                        >
                                                            Create new question
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul
                                                role="list"
                                                className="divide-y divide-gray-200 rounded-b-lg border border-gray-200"
                                            >
                                                {data.textFields.map(
                                                    (textField) => (
                                                        <li
                                                            key={
                                                                textField.index
                                                            }
                                                            className="py-4"
                                                        >
                                                            <div className="ml-3 grid grid-cols-10 gap-2">
                                                                <p className="text-sm font-bold text-gray-900">
                                                                    {
                                                                        textField.index
                                                                    }
                                                                </p>
                                                                <p className="col-span-3 text-sm font-medium text-gray-900">
                                                                    {
                                                                        textField.title
                                                                    }
                                                                </p>
                                                                <p className="col-span-3 text-sm text-gray-500">
                                                                    {
                                                                        textField.placeholder
                                                                    }
                                                                </p>
                                                                <p className="col-span-3 text-sm text-green-500">
                                                                    {
                                                                        textField.answer
                                                                    }
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                            <div className="bg-gray-50 px-4 py-5 mt-6 rounded-t-lg border-b border-gray-200 sm:px-6">
                                                <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                                                    <div className="ml-4 mt-2">
                                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                            Single-choice
                                                            questions
                                                        </h3>
                                                    </div>
                                                    <div className="ml-4 mt-2 flex-shrink-0">
                                                        <button
                                                            type="button"
                                                            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                            onClick={() =>
                                                                setOpenSQuestionModal(
                                                                    true,
                                                                )
                                                            }
                                                        >
                                                            Create new question
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul
                                                role="list"
                                                className="divide-y divide-gray-200 rounded-b-lg border border-gray-200"
                                            >
                                                {data.radioButtonsFields.map(
                                                    (radioButton) => (
                                                        <li
                                                            key={
                                                                radioButton.index
                                                            }
                                                            className="py-4"
                                                        >
                                                            <div className="ml-3 grid grid-cols-10 gap-2">
                                                                <p className="text-sm font-bold text-gray-900">
                                                                    {
                                                                        radioButton.index
                                                                    }
                                                                </p>
                                                                <p className="col-span-3 text-sm font-medium text-gray-900">
                                                                    {
                                                                        radioButton.title
                                                                    }
                                                                </p>
                                                                <p className="col-span-3 text-sm text-gray-500">
                                                                    {
                                                                        radioButton.placeholder
                                                                    }
                                                                </p>
                                                                <p className="col-span-3 text-sm text-gray-500">
                                                                    {radioButton.choices.map(
                                                                        (
                                                                            choice,
                                                                        ) =>
                                                                            choice.title +
                                                                            " (" +
                                                                            (choice.is_correct
                                                                                ? "right"
                                                                                : "wrong") +
                                                                            ") ",
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className="flex items-center justify-end mt-4">
                            <DangerButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Save
                            </DangerButton>
                        </div>

                        {/* Add a text question modal */}
                        <Modal
                            show={openTextQuestionModal}
                            closeable={true}
                            onClose={() => setOpenTextQuestionModal(false)}
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden sm:my-8 sm:align-middle sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <PlusIcon
                                            className="h-6 w-6 text-green-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <div className="text-lg leading-6 font-medium text-gray-900">
                                            Add a text question
                                        </div>
                                        <div className="mt-2"></div>
                                    </div>
                                    <div className="mt-3 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                        <label
                                            htmlFor="name"
                                            className="block text-xs font-medium text-gray-900"
                                        >
                                            Question n°{questionIndex}
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={questionTitle}
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="Question to ask"
                                            onChange={(e) =>
                                                setQuestionTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mt-2 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                        <label
                                            htmlFor="name"
                                            className="block text-xs font-medium text-gray-900"
                                        >
                                            Details
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={questionPlaceholder}
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="Any tips or hints"
                                            onChange={(e) =>
                                                setQuestionPlaceholder(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                    <label
                                        htmlFor="name"
                                        className="block text-xs font-medium text-gray-900"
                                    >
                                        Answer
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={questionAnswer}
                                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                        placeholder="Text that should be responded to give points"
                                        onChange={(e) =>
                                            setQuestionAnswer(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                        onClick={() => {
                                            if (
                                                questionTitle === "" ||
                                                questionAnswer === ""
                                            ) {
                                                toast.error(
                                                    "Question and answer fields are required",
                                                );
                                            } else {
                                                setData("textFields", [
                                                    ...data.textFields,
                                                    {
                                                        index: questionIndex,
                                                        title: questionTitle,
                                                        placeholder:
                                                            questionPlaceholder,
                                                        answer: questionAnswer,
                                                    },
                                                ]);
                                                setQuestionIndex(
                                                    questionIndex + 1,
                                                );
                                                setOpenTextQuestionModal(false);
                                                toast.success(
                                                    "Question added successfully",
                                                );
                                                setQuestionTitle("");
                                                setQuestionPlaceholder("");
                                                setQuestionAnswer("");
                                            }
                                        }}
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                        onClick={() => {
                                            setOpenTextQuestionModal(false);
                                            setQuestionTitle("");
                                            setQuestionPlaceholder("");
                                            setQuestionAnswer("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Modal>

                        {/* Add a single-choice question modal */}
                        <Modal
                            show={openSQuestionModal}
                            closeable={true}
                            onClose={() => setOpenSQuestionModal(false)}
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden sm:my-8 sm:align-middle sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <PlusIcon
                                            className="h-6 w-6 text-green-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <div className="text-lg leading-6 font-medium text-gray-900">
                                            Add a single-choice question
                                        </div>
                                        <div className="mt-2"></div>
                                    </div>
                                    <div className="mt-3 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                        <label
                                            htmlFor="name"
                                            className="block text-xs font-medium text-gray-900"
                                        >
                                            Question n°{questionIndex}
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={questionTitle}
                                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                            placeholder="Question to ask"
                                            onChange={(e) =>
                                                setQuestionTitle(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                    <label
                                        htmlFor="name"
                                        className="block text-xs font-medium text-gray-900"
                                    >
                                        Answer n°{questionChoices.length + 1}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={questionAnswer}
                                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                        placeholder="Text that should be responded to give points"
                                        onChange={(e) =>
                                            setQuestionAnswer(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mt-2 relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="isCorrect"
                                            aria-describedby="isCorrect"
                                            name="correct"
                                            type="checkbox"
                                            checked={questionCorrect}
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            onChange={() =>
                                                setQuestionCorrect(
                                                    !questionCorrect,
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="comments"
                                            className="font-medium text-gray-700"
                                        >
                                            Is correct
                                        </label>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 mt-6 rounded-t-lg border-b border-gray-200 sm:px-6">
                                    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                                        <div className="ml-4 mt-2">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                Answers
                                            </h3>
                                        </div>
                                        <div className="ml-4 mt-2 flex-shrink-0">
                                            <button
                                                type="button"
                                                className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={() => {
                                                    if (
                                                        countRightAnswers() ===
                                                            1 &&
                                                        questionCorrect
                                                    ) {
                                                        toast.error(
                                                            "Only one correct answer is allowed",
                                                        );
                                                        return;
                                                    }
                                                    if (!questionAnswer) {
                                                        toast.error(
                                                            "Answer field is required",
                                                        );
                                                        return;
                                                    }
                                                    setQuestionChoices([
                                                        ...questionChoices,
                                                        {
                                                            title: questionAnswer,
                                                            index: questionChoices.length,
                                                            is_correct:
                                                                questionCorrect,
                                                        },
                                                    ]);
                                                }}
                                            >
                                                Create new answer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-200 rounded-b-lg border border-gray-200"
                                >
                                    {questionChoices.map(
                                        (choice, choiceIdx) => (
                                            <li
                                                key={choiceIdx}
                                                className="py-4"
                                            >
                                                <div className="ml-3 grid grid-cols-10 gap-2">
                                                    <p className="text-sm font-bold text-gray-900">
                                                        {choice.index + 1}
                                                    </p>
                                                    <p className="col-span-7 text-sm font-medium text-gray-900">
                                                        {choice.title}
                                                    </p>
                                                    <p
                                                        className={
                                                            "col-span-2 text-sm text-" +
                                                            (choice.is_correct
                                                                ? "green"
                                                                : "gray") +
                                                            "-500"
                                                        }
                                                    >
                                                        {choice.is_correct
                                                            ? "right"
                                                            : "wrong"}
                                                    </p>
                                                </div>
                                            </li>
                                        ),
                                    )}
                                </ul>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                        onClick={() => {
                                            if (
                                                questionTitle === "" ||
                                                questionChoices.length === 0
                                            ) {
                                                toast.error(
                                                    "Question and at least one answer fields are required",
                                                );
                                            } else if (
                                                countRightAnswers() !== 1
                                            ) {
                                                toast.error(
                                                    "Question requires exactly one correct answer",
                                                );
                                            } else {
                                                setData("radioButtonsFields", [
                                                    ...data.radioButtonsFields,
                                                    {
                                                        index: questionIndex,
                                                        title: questionTitle,
                                                        // placeholder: questionPlaceholder,
                                                        choices:
                                                            questionChoices,
                                                    },
                                                ]);
                                                setQuestionIndex(
                                                    questionIndex + 1,
                                                );
                                                setOpenSQuestionModal(false);
                                                toast.success(
                                                    "Question added successfully",
                                                );
                                                setQuestionTitle("");
                                                setQuestionPlaceholder("");
                                                setQuestionAnswer("");
                                                setQuestionChoices([]);
                                            }
                                        }}
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                        onClick={() => {
                                            setOpenSQuestionModal(false);
                                            setQuestionTitle("");
                                            setQuestionPlaceholder("");
                                            setQuestionAnswer("");
                                            setQuestionChoices([]);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    </form>
                </div>
            </div>
            <Toaster />
        </AuthenticatedLayout>
    );
}
