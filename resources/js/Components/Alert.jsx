import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function Alert({ message }) {
    return (
        <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <CheckCircleIcon
                        className="h-5 w-5 text-green-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3">
                    <p className="text-lg font-medium text-green-800">
                        {message}
                    </p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5"></div>
                </div>
            </div>
        </div>
    );
}
