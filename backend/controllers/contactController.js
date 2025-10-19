const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try{
    const { name, email, phone, subject, message, course, city, state, country } = req.body;
    if(!name) return res.status(400).json({ message: 'Name is required' });
    const contact = await Contact.create({ name, email, phone, subject, message, course, city, state, country });
    res.status(201).json(contact);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getContacts = async (req, res) => {
  try{
    // simple pagination & search
    const { page=1, limit=20, search='', course } = req.query;
    const query = {};
    if(search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { message: { $regex: search, $options: 'i' } }
    ];
    if(course) query.course = course;
    const skip = (parseInt(page)-1)*parseInt(limit);
    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
    res.json({ total, page: parseInt(page), limit: parseInt(limit), contacts });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getContact = async (req, res) => {
  try{
    const contact = await Contact.findById(req.params.id);
    if(!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateContact = async (req, res) => {
  try{
    const contact = await Contact.findById(req.params.id);
    if(!contact) return res.status(404).json({ message: 'Contact not found' });
    Object.assign(contact, req.body);
    await contact.save();
    res.json(contact);
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteContact = async (req, res) => {
  try{
    const contact = await Contact.findById(req.params.id);
    if(!contact) return res.status(404).json({ message: 'Contact not found' });
    await contact.remove();
    res.json({ message: 'Contact removed' });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
