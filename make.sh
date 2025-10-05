#!/usr/bin/env bash
clear && docker-compose down && docker-compose up -d --build && docker logs --follow moderation-bot
