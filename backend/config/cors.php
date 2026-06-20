<?php

return [
    'paths' => ['*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:5173', 
        'http://localhost:5174', 
        'https://app-45694296-daec-4264-9167-45a65f5e680e.cleverapps.io'
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
