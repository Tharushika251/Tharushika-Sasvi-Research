import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../utils/fetchapi';
import { createClient } from '@supabase/supabase-js';
import PersonalInformation from '../../components/profileComponents/PersonalInformation';
import EditProfileForm from '../../components/profileComponents/EditProfileForm';
import LoadingProfile from '../../components/profileComponents/LoadingProfile';
import SuccessMessage from '../../components/profileComponents/SuccessMessage';

import { Camera, Shield } from 'lucide-react';

const supabaseUrl = 'https://nelqemsnxiomtaosceui.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lbHFlbXNueGlvbXRhb3NjZXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTA1OTEsImV4cCI6MjA2MTQyNjU5MX0.blyjPV4hGnAQpaCyWJD1LAljPt5SWa8o4SxvWEAGAUU';
const supabase = createClient(supabaseUrl, supabaseKey);

const Profile = () => {
    const { currentUser, loading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const updateData = {
                name: formData.name,
                email: formData.email,
            };

            const response = await api.editProfile(updateData, currentUser.user_id);
            if (response.status === 200) {
                setIsEditing(false);
                setSuccessMessage('Profile updated successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setSuccessMessage('Failed to update profile. Please try again.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(true);
            const reader = new FileReader();
            reader.onload = () => {
                setFormData({ ...formData, profile_image: reader.result });
            };
            reader.readAsDataURL(file);

            const fileExt = file.name.split('.').pop();
            const fileName = `${currentUser.user_id}-${Date.now()}.${fileExt}`;
            const filePath = `profile-images/${fileName}`;

            const { error } = await supabase.storage
                .from('foodie')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) throw error;

            const { data: urlData } = supabase.storage
                .from('academiIQ')
                .getPublicUrl(filePath);

            const imageUrl = urlData.publicUrl;
            await api.updateProfileImage({ profileImage: imageUrl }, currentUser.user_id);

            setSuccessMessage('Profile image updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error uploading image:', error);
            setSuccessMessage('Failed to update profile image. Please try again.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authLoading) return;
        setLoading(true);
        const timer = setTimeout(() => {
            if (currentUser) {
                setFormData({
                    user_id: currentUser.user_id || '',
                    name: currentUser.name || '',
                    email: currentUser.email || '',
                    role: currentUser.role || '',
                    profile_image: currentUser.profile_image || '',
                    member_since: 'April 2025',
                });
                setLoading(false);
            } else {
                navigate('/login');
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [currentUser, navigate, authLoading]);

    if (loading || authLoading) {
        return <LoadingProfile />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-300 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">My Profile</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your account and preferences</p>
                </div>

                {successMessage && <SuccessMessage message={successMessage} />}

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="relative bg-gradient-to-r h-48 from-indigo-500 to-blue-400 dark:from-slate-600 dark:to-slate-900">
                        <div className="absolute -bottom-16 left-8">
                            <div className="relative">
                                {formData.profile_image ? (
                                    <img
                                        src={formData.profile_image}
                                        alt={formData.name}
                                        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg">
                                        <span className="text-5xl font-bold text-indigo-600">
                                            {formData.name ? formData.name.charAt(0) : ''}
                                        </span>
                                    </div>
                                )}
                                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full text-indigo-800 cursor-pointer shadow hover:bg-indigo-600 hover:text-white transition">
                                    <Camera size={20} />
                                    <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                                </label>
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-6">
                            <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-lg px-4 py-1 text-white flex items-center shadow">
                                <Shield size={16} className="mr-2" />
                                <span className="font-semibold uppercase tracking-wide">{formData.role}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 px-8 pb-8">
                        <div className="border-b border-gray-200 dark:border-slate-700 mb-6">
                            <nav className="flex space-x-8">
                                {[{ id: 'profile', label: 'Personal Information', visible: true },
                                { id: 'create-quiz', label: 'Create Quiz', visible: formData.role === 'teacher' }
                                ].filter(tab => tab.visible).map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-3 px-4 border-b-2 font-medium text-sm ${activeTab === tab.id
                                            ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div>
                            {activeTab === 'profile' && (
                                isEditing ? (
                                    <EditProfileForm
                                        formData={formData}
                                        handleInputChange={handleInputChange}
                                        handleSubmit={handleSubmit}
                                        setIsEditing={setIsEditing}
                                    />
                                ) : (
                                    <PersonalInformation
                                        formData={formData}
                                        setIsEditing={setIsEditing}
                                    />
                                )
                            )}
                            {activeTab === 'create-quiz' && (
                                <React.Suspense fallback={<div>Loading quiz form...</div>}>
                                    {/* < /> */}
                                </React.Suspense>
                            )}                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;