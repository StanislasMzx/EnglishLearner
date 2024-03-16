import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/solid";
import {
    PlayPauseIcon,
    MinusIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import dateFormat from "dateformat";
import ReactPlayer from "react-player/lazy";

const product = {
    rating: 4,
    details: [
        {
            name: "Features",
            items: [
                "Multiple strap configurations",
                "Spacious interior with top zip",
                "Leather handle and tabs",
                "Interior dividers",
                "Stainless strap loops",
                "Double stitched construction",
                "Water-resistant",
            ],
        },
        // More sections...
    ],
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Quizz({ auth, quizz, video_src }) {
    console.log(quizz);
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
                    <div className="lg:grid lg:grid-cols-3 lg:gap-x-16 lg:items-start">
                        <div className="col-span-2">
                            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-500">
                                    Video: {quizz.video.title}
                                </h1>

                                <div className="mt-3">
                                    <h2 className="sr-only">
                                        Product information
                                    </h2>
                                    <p className="text-3xl text-gray-900">
                                        Created on{" "}
                                        {dateFormat(
                                            quizz.created_at,
                                            "mmmm dS, yyyy",
                                        )}
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
                        </div>
                        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                            <section
                                aria-labelledby="details-heading"
                                className="mt-12"
                            >
                                <h2 id="details-heading" className="sr-only">
                                    Additional details
                                </h2>

                                <div className="border-t divide-y divide-gray-200">
                                    {product.details.map((detail) => (
                                        <Disclosure as="div" key={detail.name}>
                                            {({ open }) => (
                                                <>
                                                    <h3>
                                                        <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                            <span
                                                                className={classNames(
                                                                    open
                                                                        ? "text-indigo-600"
                                                                        : "text-gray-900",
                                                                    "text-sm font-medium",
                                                                )}
                                                            >
                                                                {detail.name}
                                                            </span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon
                                                                        className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <PlusIcon
                                                                        className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel
                                                        as="div"
                                                        className="pb-6 prose prose-sm"
                                                    >
                                                        <ul role="list">
                                                            {detail.items.map(
                                                                (item) => (
                                                                    <li
                                                                        key={
                                                                            item
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
