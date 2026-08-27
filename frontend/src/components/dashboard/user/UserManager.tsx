// UserManager.tsx
import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { User } from '@/types';
import { Role } from '@/enum/user-role.enum';

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State for the create/edit form
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: Role.ADMIN,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<User[]>('/user');
      setUsers(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingId) {
        const payload = { ...formData };
        if (!payload.password) delete payload.password;
        await apiClient.patch(`/user/${editingId}`, payload);
      } else {
        await apiClient.post('/user', formData);
      }
      resetForm();
      await fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/user/${id}`);
      await fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  // Populate form for editing
  const startEdit = (user: User) => {
    setEditingId(user.id);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      role: user.role,
    });
    setShowForm(true);
  };

  // Cancel / Reset form
  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', email: '', password: '', role: Role.ADMIN });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">User Management</h1>
            <p className="text-sm text-zinc-400 mt-1">Manage system users, roles, and administrative access.</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/20 transition-all duration-200 active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New User
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Create/Edit Modal Drawer */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-zinc-800">
                <h3 className="text-lg font-semibold text-white">
                  {editingId ? 'Edit User' : 'Create New User'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">First Name</label>
                    <input
                      name="firstName"
                      value={formData.firstName || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="Jane"
                      className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Last Name</label>
                    <input
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="Doe"
                      className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    required
                    placeholder="jane.doe@example.com"
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Password {editingId && <span className="text-zinc-500">(leave blank to keep unchanged)</span>}
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password || ''}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required={!editingId}
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role || Role.ADMIN}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors capitalize"
                  >
                    {Object.values(Role).map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800/80 mt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-600/20"
                  >
                    {loading ? 'Saving...' : editingId ? 'Update User' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && !users.length && (
          <div className="flex items-center justify-center p-12 text-zinc-400">
            <svg className="w-6 h-6 animate-spin text-indigo-500 mr-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading users...
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden md:block bg-zinc-900 border border-zinc-800/80 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950/60 text-zinc-400 text-xs uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th scope="col" className="px-6 py-3.5 font-semibold">User</th>
                <th scope="col" className="px-6 py-3.5 font-semibold">ID</th>
                <th scope="col" className="px-6 py-3.5 font-semibold">Role</th>
                <th scope="col" className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center font-medium text-indigo-400 text-sm">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </div>
                      <div>
                        <div className="font-medium text-white">{user.firstName} {user.lastName}</div>
                        <div className="text-xs text-zinc-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-zinc-500">{user.id}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => startEdit(user)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="Edit User"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                        title="Delete User"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Grid View */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {users.map((user) => (
            <div key={user.id} className="bg-zinc-900 border border-zinc-800/80 rounded-xl p-4 space-y-3 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-medium text-indigo-400 text-sm">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{user.firstName} {user.lastName}</h4>
                    <p className="text-xs text-zinc-400">{user.email}</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 capitalize">
                  {user.role}
                </span>
              </div>

              <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
                <span className="font-mono">ID: {user.id}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEdit(user)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-950/30 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {users.length === 0 && !loading && (
          <div className="text-center py-16 bg-zinc-900/50 border border-zinc-800/80 rounded-xl">
            <svg className="mx-auto h-12 w-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="mt-4 text-base font-semibold text-zinc-200">No users found</h3>
            <p className="mt-1 text-sm text-zinc-500">Get started by creating a new user.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserManager;