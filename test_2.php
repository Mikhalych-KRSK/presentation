<?php


function get_avatar($user_id)
{
    $botkey = 'http://...' . BOT_TOKEN;

    $headers = array("Content-Type: application/x-www-form-urlencoded; charset: UTF-8");
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_URL, $botkey . '/getUserProfilePhotos?offset=1');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, 'user_id=' . $user_id);
    $c = curl_exec($curl);
    curl_close($curl);
    $photos_info = json_decode($c, true);
    if ($photos_info['ok']) {
        $photo_file_id = $photos_info['result']['photos'][0][0]['file_id'];
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_URL, $botkey . '/getFile?file_id=' . $photo_file_id);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, 'user_id=' . $user_id);
        $p = curl_exec($curl);
        curl_close($curl);
        echo $p."\n";
        $file_source_path = json_decode($p,true)['result']['file_path'];
        $file_destination_path = './xxx/'.$user_id;
        if (mkdir($file_destination_path)){
            copy($file_source_path,$file_destination_path.'/avatar.jpg');
            echo 'https://.../'.$user_id.'/xxx.jpg';
        }else{
            copy($file_source_path,$file_destination_path.'/avatar.jpg');
            echo 'https://.../'.$user_id.'/xxx.jpg';
        }
    }
}

//вычислялка процентов
function percent($value, $percent, $plus_or_minus)
{
    $value_percent = $value / 100 * $percent;
    if ($plus_or_minus == '+') {
        $result = $value + $value_percent;
    } elseif ($plus_or_minus == '-') {
        $result = $value - $value_percent;
    }
    return round($result);
}


function energy($user_id, $state, $var)
{
    $db = new con_db();
    $db = $db->dbo;
    
    //тут работа с базой//

    if ($state == 'check') {
        //посчитаем когда восстановится полностью вся энергия
        if (!empty($block_to)) {

            //чек на минусовую энергию
            if ($energy < 0) {
                $energy = 0;
                $sql_update_energy = $db->prepare("UPDATE ... SET energy=:energy WHERE user_id=:user_id;");
                $sql_update_energy->execute(['user_id' => $user_id, 'energy' => $energy]);
            }

            $points_to_restore = floor((time() - $block_to) / $restore_time);
            //если время подошло восстанавливаем очки энергии
            if (($energy + $points_to_restore) >= $level_energy) {
                energy($user_id, 'plus', $level_energy);
            } elseif (($energy + $points_to_restore) < $level_energy && $points_to_restore > 0) {
                energy($user_id, 'plus', $points_to_restore);
            }
        } else {
            $points_to_restore = 0;
        }
        $result = $energy * 1;
    } elseif ($state == 'plus') {
        //прибавляем энергию и пишем обновление в базу
        //энергия полная, пишем в базу и отправляем пуш пользователю
        if ($var + $energy >= $level_energy) {

            $energy = $level_energy;
            $block_to = null;

            $message_send = 1;
        } elseif ($var + $energy < $level_energy) {
            $energy = $energy + $var;
            //Если подошло время начисления поинта и это не возврат энергии по отмене то обновляем время блокировки
            if (floor((time() - $block_to) >= $restore_time)) {
                $block_to = $block_to + ($var * $restore_time);
            }
        }
        $sql_update_energy = $db->prepare("UPDATE ... SET energy=:energy, block_to=:block_to WHERE user_id=:user_id;");
        $sql_update_energy->execute(['user_id' => $user_id, 'energy' => $energy, 'block_to' => $block_to]);

        $result = ['energy' => $energy, 'block_to' => $block_to];
    } elseif ($state == 'minus') {
        //отнимаем энергию и пишем обновление в базу
        if (!empty($block_to)) {
            if ($energy > 0) {
                $energy = $energy - $var;
                $message_send = 0;
            } else {
                $energy = 0;
                $message_send = 0;
            }
            $sql_update_energy = $db->prepare("UPDATE ... SET energy=:energy, energy_message = 0 WHERE user_id=:user_id;");
            $sql_update_energy->execute(['user_id' => $user_id, 'energy' => $energy]);
        } elseif ($block_to == null) {
            $energy = $energy - $var;
            $block_to = time();
            $message_send = 0;
            $sql_update_energy = $db->prepare("UPDATE ... SET energy=:energy, block_to=:block_to, energy_message = 0  WHERE user_id=:user_id;");
            $sql_update_energy->execute(['user_id' => $user_id, 'energy' => $energy, 'block_to' => $block_to]);
        }
        $result = ['energy' => $energy, 'block_to' => $block_to];
    }
    return ($result);
}


