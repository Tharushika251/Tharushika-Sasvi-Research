import React from 'react';
import { Edit, Mail, Phone, MapPin, Shield, FileText, Clock } from 'lucide-react';

const PersonalInformation = ({ formData, setIsEditing }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{formData.name}</h2>
                <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                >
                    <Edit size={18} className="mr-2" /> Edit Profile
                </button>
            </div>

            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                            <Mail className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                <p className="text-gray-800 dark:text-white">{formData.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Phone className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                                <p className="text-gray-800 dark:text-white">{formData.phone_number}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <MapPin className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                                <p className="text-gray-800 dark:text-white">{formData.address}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Shield className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Account Type</p>
                                <p className="text-gray-800 dark:text-white">{formData.role}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Account Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                            <FileText className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                                <p className="text-gray-800 dark:text-white">{formData.user_id}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Clock className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                                <p className="text-gray-800 dark:text-white">{formData.member_since || 'January 2023'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;
