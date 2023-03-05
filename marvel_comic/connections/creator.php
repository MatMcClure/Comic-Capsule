<?php
    if (isset($_GET['creator-id'])) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $creator_id = htmlentities(strtolower($_GET['creator-id']));

        $ts = time();
        $public_key = 'dd7f2cd8f5d86ffabc49d85c646cb34a';
        $private_key = '005c02b8b806ebfada4ef93c22dad64d3e425f95';
        $hash = md5($ts . $private_key . $public_key);

        $query = array(
            'apikey' => $public_key,
            'ts' => $ts,
            'hash' => $hash,
        );

        curl_setopt($curl, CURLOPT_URL,
        "https://gateway.marvel.com:443/v1/public/creators/" . $creator_id . "/comics" . "?" . http_build_query($query));

        $result = json_decode(curl_exec($curl), true);

        curl_close($curl);

        echo json_encode($result);
    } else {
        echo "Error";
    }
?>