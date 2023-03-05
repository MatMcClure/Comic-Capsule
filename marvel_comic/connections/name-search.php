<?php
    if (isset($_GET['name'])) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $name_to_search = htmlentities(strtolower($_GET['name']));

        $ts = time();
        $public_key = 'dd7f2cd8f5d86ffabc49d85c646cb34a';
        $private_key = '005c02b8b806ebfada4ef93c22dad64d3e425f95';
        $hash = md5($ts . $private_key . $public_key);

        $query = array(
            "name" => $name_to_search,
            "orderBy" => "name",
            "limit" => "20",
            'apikey' => $public_key,
            'ts' => $ts,
            'hash' => $hash,
        );

        $url = 'https://gateway.marvel.com:443/v1/public/characters?' . http_build_query($query);

        curl_setopt($curl, CURLOPT_URL, $url);

        $result = json_decode(curl_exec($curl), true);

        curl_close($curl);

        echo json_encode($result);
    } else {
        echo "Error";
    }
?>