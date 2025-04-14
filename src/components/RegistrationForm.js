// import React, { useState, useEffect } from 'react';

// const RegistrationForm = ({ onRegisterSuccess }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [age, setAge] = useState('');
//   const [location, setLocation] = useState('');
//   const [languagePreference, setLanguagePreference] = useState('');
//   const [selectedCrops, setSelectedCrops] = useState([]);  // State to hold selected crops
//   const [availableCrops, setAvailableCrops] = useState([]);  // Available crop types from CropDetails
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Fetch crop types when the component mounts
//   useEffect(() => {
//     const fetchCropTypes = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/users/cropTypes');
//         const data = await response.json();
//         setAvailableCrops(data); // Set available crop types
//       } catch (err) {
//         console.error('Error fetching crop types:', err);
//         setError('Failed to load crop types');
//       }
//     };

//     fetchCropTypes();
//   }, []);

//   // Handle the crop selection
//   const handleCropChange = (e) => {
//     const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
//     setSelectedCrops(selectedOptions);  // Update selected crops
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:8080/api/users/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username,
//           password,
//           email,
//           fullName,
//           age,
//           location,
//           languagePreference,
//           crops: selectedCrops.map(cropId => ({ id: cropId })) // Send selected crops
//         }),
//       });

//       if (!response.ok) throw new Error('Registration failed');

//       const data = await response.json();
//       onRegisterSuccess(data); // Call the parent method on successful registration

//       // Clear form fields after successful registration
//       setUsername('');
//       setPassword('');
//       setEmail('');
//       setFullName('');
//       setAge('');
//       setLocation('');
//       setLanguagePreference('');
//       setSelectedCrops([]);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="number"
//           name="age"
//           placeholder="Age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <input
//           type="text"
//           name="languagePreference"
//           placeholder="Language Preference"
//           value={languagePreference}
//           onChange={(e) => setLanguagePreference(e.target.value)}
//           required
//           style={styles.input}
//         />

//         {/* Crop Type Dropdown */}
//         <select
//           multiple
//           value={selectedCrops}
//           onChange={handleCropChange}
//           style={styles.input}
//         >
//           {availableCrops.map((crop) => (
//             <option key={crop.id} value={crop.id}>
//               {crop.name}
//             </option>
//           ))}
//         </select>

//         <button type="submit" style={styles.button} disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
//         </button>

//         {error && <p style={styles.error}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: { maxWidth: '400px', margin: 'auto', padding: '20px' },
//   form: { display: 'flex', flexDirection: 'column' },
//   input: { marginBottom: '10px', padding: '10px', fontSize: '16px' },
//   button: { padding: '10px', backgroundColor: '#28a745', color: 'white', fontSize: '16px' },
//   error: { color: 'red' },
// };

// export default RegistrationForm;
