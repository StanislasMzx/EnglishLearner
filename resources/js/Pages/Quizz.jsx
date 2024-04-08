import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { StarIcon } from "@heroicons/react/24/solid";
import dateFormat from "dateformat";
import ReactPlayer from "react-player/lazy";
import DangerButton from "@/Components/DangerButton.jsx";

const product = {
    rating: 4,
    details: [
        {
            name: "Features",
        },
        // More sections...
    ],
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Quizz({ auth, quizz, video_src }) {
    let questions = [...quizz.text_fields, ...quizz.radio_buttons_fields];
    questions.sort((a, b) => a.index - b.index);

    const { data, setData, post, processing, errors, reset } = useForm();

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("quizz.validate-answers", { quizz_id: quizz.id }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Quizz: {quizz.title}
                </h2>
            }
        >
            <Head title="Viewer" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-500">
                            Media: {quizz.video.title}
                        </h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">
                                Created on{" "}
                                {dateFormat(quizz.created_at, "mmmm dS, yyyy")}
                            </p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-3">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                product.rating > rating
                                                    ? "text-indigo-500"
                                                    : "text-gray-300",
                                                "h-5 w-5 flex-shrink-0",
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">
                                    {product.rating} out of 5 stars
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>

                            <div
                                className="text-base text-gray-700 space-y-6"
                                dangerouslySetInnerHTML={{
                                    __html: quizz.description,
                                }}
                            />
                        </div>

                        <div className="mt-10">
                            <ReactPlayer
                                url={video_src}
                                controls={true}
                                width="100%"
                            />
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <div className="mt-10 px-4 sm:px-0 sm:mt-16">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {questions.map((question) => (
                                    <div
                                        key={question.index}
                                        className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 hover:border-gray-400"
                                    >
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500">
                                            <span className="text-l font-bold leading-none text-white">
                                                {question.index}
                                            </span>
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <span
                                                className="absolute inset-0"
                                                aria-hidden="true"
                                            />
                                            <p className="text-sm font-medium text-gray-900">
                                                {question.title}
                                            </p>
                                            <div className="truncate text-sm text-gray-500">
                                                {!question?.choices ? (
                                                    <input
                                                        type="text"
                                                        name={question.index}
                                                        id={question.index}
                                                        value={
                                                            data[
                                                                question.index.toString()
                                                            ] || ""
                                                        }
                                                        className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder={
                                                            question.placeholder
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                question.index.toString(),
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <fieldset>
                                                        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                                            {question.choices.map(
                                                                (choice) => (
                                                                    <div
                                                                        key={
                                                                            choice.id
                                                                        }
                                                                        className="flex items-center"
                                                                    >
                                                                        <input
                                                                            id={
                                                                                question.index
                                                                            }
                                                                            name={
                                                                                question.index
                                                                            }
                                                                            type="radio"
                                                                            className="relative h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                                            onChange={(
                                                                                e,
                                                                            ) =>
                                                                                setData(
                                                                                    question.index.toString(),
                                                                                    choice.id,
                                                                                )
                                                                            }
                                                                        />
                                                                        <label
                                                                            htmlFor={
                                                                                choice.id
                                                                            }
                                                                            className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                                                                        >
                                                                            {
                                                                                choice.title
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </fieldset>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <DangerButton className="mt-4">Submit</DangerButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
