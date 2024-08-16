#!/bin/bash

# MongoDB servisini başlat
sudo systemctl start mongod

# visual studio aç
code . 
# Yeni bir terminal penceresi açarak backend uygulamasını başlat
gnome-terminal -- bash -c "cd backend; npm start; exec bash"

# Yeni bir terminal penceresi açarak frontend uygulamasını başlat
gnome-terminal -- bash -c "cd frontend; npm run dev; exec bash"

# Frontend uygulaması başlatıldığında localhost:5117 adresini aç
sleep 5 # Frontend'in başlatılması için biraz daha uzun bir bekleme süresi
xdg-open http://localhost:5173
