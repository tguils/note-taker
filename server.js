const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const fs = require('fs');


app.use(express.static('public'));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});