import React, { useState } from 'react';
import { Button, Typography, TextField, IconButton, Tooltip, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

const templates = {
  "Feedback Template test": "Dear [Recipient],\n\nThank you for your feedback.\n\nBest regards,\n[Your Name]",
  "CS Auto response": "Hello [Recipient],\n\nThank you for contacting customer support. We will get back to you shortly.\n\nSincerely,\n[Your Name]",
  "1st Follow up email": "Hi [Recipient],\n\nThis is a follow-up regarding your previous inquiry.\n\nRegards,\n[Your Name]",
  "KapdemoTest": "Dear [Recipient],\n\nThank you for participating in our demo.\n\nBest regards,\n[Your Name]",
  "Test Template": "Hello [Recipient],\n\nThis is a test template.\n\nSincerely,\n[Your Name]",
  "Auto Response": "Hi [Recipient],\n\nWe have received your email and will respond shortly.\n\nRegards,\n[Your Name]",
  "Test Zell": "Dear [Recipient],\n\nThank you for reaching out to Zell.\n\nBest regards,\n[Your Name]",
  "Test CSAT": "Hello [Recipient],\n\nThank you for completing our survey.\n\nSincerely,\n[Your Name]",
  "Customer ticket url": "Hi [Recipient],\n\nHere is the link to your ticket: [Ticket URL].\n\nRegards,\n[Your Name]"
};

const ComposeEmail = ({ onBackClick}) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [message, setMessage] = useState("");

  const handleTemplateChange = (event) => {
    const template = event.target.value;
    setSelectedTemplate(template);
    setMessage(templates[template]);
  };

  return (
    <div className="mt-4 p-6 bg-white shadow rounded-lg">
      <div className="flex items-center mb-6">
        <Tooltip title="Back">
          <IconButton onClick={onBackClick} className="mr-3">
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h5" className="font-bold">Compose Email</Typography>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="body2" className="mb-1">From:</Typography>
          <TextField
            placeholder="Enter sender's email"
            variant="outlined"
            fullWidth
            defaultValue="kapdemo@kapture.com"
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2" className="mb-1">To:</Typography>
          <TextField
            placeholder="Enter recipient's email"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body2" className="mb-1">CC:</Typography>
          <TextField
            placeholder="Enter CC email(s)"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body2" className="mb-1">BCC:</Typography>
          <TextField
            placeholder="Enter BCC email(s)"
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" className="mb-1 font-bold">Subject:</Typography>
          <TextField
            placeholder="Enter email subject"
            variant="outlined"
            fullWidth
            inputProps={{ style: { fontSize: 18 } }} // Increase font size
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" className="mb-4">
            <InputLabel id="template-label">Select Template</InputLabel>
            <Select
              labelId="template-label"
              value={selectedTemplate}
              onChange={handleTemplateChange}
              label="Select Template"
            >
              {Object.keys(templates).map((template) => (
                <MenuItem key={template} value={template}>
                  {template}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" className="mb-1 font-bold">Message:</Typography>
          <div className="flex items-center mb-2">
            <Tooltip title="Bold">
              <IconButton>
                <FormatBoldIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Italic">
              <IconButton>
                <FormatItalicIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Underline">
              <IconButton>
                <FormatUnderlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Bullet List">
              <IconButton>
                <FormatListBulletedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Numbered List">
              <IconButton>
                <FormatListNumberedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Align Left">
              <IconButton>
                <FormatAlignLeftIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Align Center">
              <IconButton>
                <FormatAlignCenterIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Align Right">
              <IconButton>
                <FormatAlignRightIcon />
              </IconButton>
            </Tooltip>
          </div>
          <TextField
            placeholder="Compose your message"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Grid>
      </Grid>

      <div className="flex justify-end mt-6">
        <Button
          variant="contained"
          color="primary"
          startIcon={<EmailIcon />}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ComposeEmail;
