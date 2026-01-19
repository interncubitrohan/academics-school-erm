import React from 'react';
import { Link } from 'react-router';

const Academics = () => {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">Academics Module</h1>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
                Manage academic infrastructure, classes, and exams here.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/academics/infrastructure/rooms" className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700 transition">
                    <h2 className="text-xl font-semibold dark:text-gray-200">Rooms</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage classrooms and labs</p>
                </Link>
                <Link to="/academics/infrastructure/subjects" className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700 transition">
                    <h2 className="text-xl font-semibold dark:text-gray-200">Subjects</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage course subjects</p>
                </Link>
                <Link to="/academics/infrastructure/grading" className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700 transition">
                    <h2 className="text-xl font-semibold dark:text-gray-200">Grading Systems</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Configure grading scales</p>
                </Link>
                <Link to="/academics/class-configuration" className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700 transition">
                    <h2 className="text-xl font-semibold dark:text-gray-200">Class Configuration</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Setup classes and sections</p>
                </Link>
                <Link to="/academics/exams" className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700 transition">
                    <h2 className="text-xl font-semibold dark:text-gray-200">Exams & Results</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage exams and view results</p>
                </Link>
            </div>
        </div>
    );
};

export default Academics;
