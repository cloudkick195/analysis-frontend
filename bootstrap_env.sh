#!/bin/bash

chmod +x ./.env.production

sed -i "s/{UTIL_URL}/${UTIL_URL}/g" .env.production
sed -i "s/{IDENTITY_URL}/${IDENTITY_URL}/g" .env.production
sed -i "s/{BASE_URL_NEWS}/${BASE_URL_NEWS}/g" .env.production
sed -i "s/{RELEASE_VERSION}/${RELEASE_VERSION}/g" .env.production