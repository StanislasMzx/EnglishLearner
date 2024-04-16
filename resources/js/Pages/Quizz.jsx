import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { StarIcon } from "@heroicons/react/24/solid";
import dateFormat from "dateformat";
import ReactPlayer from "react-player/lazy";
import DangerButton from "@/Components/DangerButton.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Alert from "@/Components/Alert.jsx";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function DestroyQuiz({ authId, quizz }) {
    if (authId === quizz.user_id) {
        return (
            <DangerButton
                onClick={() =>
                    router.delete(
                        route("quizz.destroy", { quizz_id: quizz.id }),
                    )
                }
                className="mt-4"
            >
                Delete quiz
            </DangerButton>
        );
    }
    return null;
}

function ComputeScore(corrected) {
    let score = 0.0;
    for (const question of corrected) {
        if (typeof question.value === "number") {
            score += question.correct ? 1 : 0;
        } else {
            score += question.value === question.correct ? 1 : 0;
        }
    }
    return ((score / corrected.length) * 100).toFixed(2);
}

function GetAnswer(corrected, index) {
    for (const i in corrected) {
        if (corrected[i].index === index) {
            return corrected[i];
        }
    }
    return undefined;
}

export default function Quizz({ auth, quizz, corrected, video_src }) {
    let questions = [...quizz.text_fields, ...quizz.radio_buttons_fields];
    questions.sort((a, b) => a.index - b.index);

    const { data, setData, post, processing, errors, reset } = useForm();

    const submit = (e) => {
        e.preventDefault();
        post(route("quizz.validate-answers", { quizz_id: quizz.id }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Quiz: {quizz.title}
                </h2>
            }
        >
            <Head title="Viewer" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        {corrected && (
                            <Alert
                                message={
                                    "Your score is " +
                                    ComputeScore(corrected) +
                                    "%"
                                }
                            />
                        )}

                        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-500">
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
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <p className="text-xl text-gray-900 mr-2">
                                        Difficulty
                                    </p>
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                quizz.difficulty > rating
                                                    ? "text-indigo-500"
                                                    : "text-gray-300",
                                                "h-5 w-5 flex-shrink-0",
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
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
                                            <div className="text-ellipsis text-sm text-gray-500">
                                                {!question?.choices ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            name={
                                                                question.index
                                                            }
                                                            id={question.index}
                                                            value={
                                                                data[
                                                                    question.index.toString()
                                                                ] || ""
                                                            }
                                                            className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            required={true}
                                                            placeholder={
                                                                question.placeholder
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    question.index.toString(),
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                corrected &&
                                                                GetAnswer(
                                                                    corrected,
                                                                    question.index,
                                                                ).value !==
                                                                    GetAnswer(
                                                                        corrected,
                                                                        question.index,
                                                                    ).correct
                                                                    ? "The right answer is " +
                                                                      GetAnswer(
                                                                          corrected,
                                                                          question.index,
                                                                      ).correct
                                                                    : ""
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <fieldset>
                                                            <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                                                                {question.choices.map(
                                                                    (
                                                                        choice,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                choice.id
                                                                            }
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                required={
                                                                                    true
                                                                                }
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
                                                                                        choice.index,
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
                                                        <InputError
                                                            message={
                                                                corrected &&
                                                                !GetAnswer(
                                                                    corrected,
                                                                    question.index,
                                                                ).correct
                                                                    ? "The is not the right answer"
                                                                    : ""
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <PrimaryButton className="mt-4">
                                Submit
                            </PrimaryButton>
                        </div>
                    </form>
                    <DestroyQuiz authId={auth.user.id} quizz={quizz} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
