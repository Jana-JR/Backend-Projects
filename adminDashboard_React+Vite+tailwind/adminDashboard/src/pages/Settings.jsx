import { useState } from "react";
import { Button, TextField, Avatar, Box, Typography } from "@mui/material";


export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState("/default-avatar.png");
    const [error, setError] = useState("");

  const handleSave = () => {
    alert("Settings saved.");
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setProfilePic(file);
        setPreview(URL.createObjectURL(file));
    }
};

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl/20">
      <Typography variant="h4" fontWeight="bold" mb={4} >
                    Admin Settings
                </Typography>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Avatar src={preview} sx={{ width: 80, height: 80 }} />
                    <Button variant="contained" component="label" sx={{ mt: 3, bgcolor: "rgb(17, 24, 39)", "&:hover": { bgcolor: "black" } }}>
                        Change Profile Picture
                        <input hidden accept="image/*" type="file" onChange={handleProfilePicChange} />
                    </Button>
                </Box>
                <TextField
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    sx={{ "&:hover fieldset": { borderColor: "black" } }}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    sx={{ "&:hover fieldset": { borderColor: "black" } }}
                />
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    sx={{ "&:hover fieldset": { borderColor: "black" } }}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="normal"
                    error={!!error}
                    helperText={error}
                    sx={{ "&:hover fieldset": { borderColor: "black" } }}
                />
                
                <Button
                    
                    variant="contained"
                sx={{ mt: 3, bgcolor: "rgb(17, 24, 39)", "&:hover": { bgcolor: "black" } }}
                onClick={handleSave}
                >
                Save Changes
            </Button>
    </div>
  );
}
