const InstructorProfile = require('../models/instructorProfile');

const getMyProfile = async (req, res) => {
  try {
    const profile = await InstructorProfile.findOne({ where: { user_id: req.user.id } });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const createProfile = async (req, res) => {
  try {
    const { bio, profile_pic_url, expertise } = req.body;

    const profile = await InstructorProfile.create({
      user_id: req.user.id,
      bio: bio,
      profile_pic_url: profile_pic_url,
      expertise: expertise
    });
    
    res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (err) {
    console.error('Error creating profile:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { bio, profile_pic_url, expertise } = req.body;

    const profile = await InstructorProfile.findOne({ where: { user_id: req.user.id } });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    profile.bio = bio || profile.bio;
    profile.profile_pic_url = profile_pic_url || profile.profile_pic_url;
    profile.expertise = expertise || profile.expertise;
    await profile.save();

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

module.exports = { getMyProfile, createProfile, updateProfile };
