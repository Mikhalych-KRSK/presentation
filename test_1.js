let api_addr = '...';

document.getElementById('btn_id').addEventListener('click', () => {
    const get_user_id = document.getElementById('inp_id').value;
    console.log(get_user_id);
    console.log('id считан')

    let post_user_info = JSON.stringify({
        "state": "get_info",
        "user_id": get_user_id
    });
    
    $.ajax({
        url: api_addr + '/user_check',
        headers: {
            //'Auth': initdata,
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: post_user_info,
        dataType: 'json',
        success: function (data) {
            console.log('data user_check пришла')
            console.log(data)
            
            let equip = data.equip;
            var language = data.language;

            document.getElementById("status_stat").innerText = data.status
            document.getElementById("userLevel_stat").innerText = data.user_level
            document.getElementById("userEmail_stat").innerText = get_user_id
            document.getElementById("userXp_stat").innerText = data.user_xp
            document.getElementById("userName_stat").innerText = data.full_name
            document.getElementById("language_stat").innerText = data.language
            document.getElementById("userHp_stat").innerText = data.user_hp
            document.getElementById("userDamage_stat").innerText = data.user_damage
            document.getElementById("nextLevelXp_stat").innerText = data.next_level_xp
            document.getElementById("userTickets_stat").innerText = data.user_tickets
            document.getElementById("hideId_stat").innerText = data.hide_id
            document.getElementById("energy_stat").innerText = data.energy
            document.getElementById("resetPoints_stat").innerText = data.reset_points
            document.getElementById("points_stat").innerText = data.points
            document.getElementById("maxPointsToChar_stat").innerText = data.max_points_to_char
            document.getElementById("userCritChance_stat").innerText = data.user_crit_chance
            document.getElementById("userCritPercent_stat").innerText = data.user_crit_percent
            document.getElementById("userCritDamage_stat").innerText = data.user_crit_damage
            document.getElementById("userDoubleHitChance_stat").innerText = data.user_double_hit_chance
            document.getElementById("userRating_stat").innerText = data.user_rating
            document.getElementById("isAnonim_stat").innerText = data.is_anonim
            document.getElementById("userEvasionChance_stat").innerText = data.user_evasion_chance
            document.getElementById("userStrength_stat").innerText = data.user_strength
            document.getElementById("userDexterity_stat").innerText = data.user_agility
            document.getElementById("userIntuition_stat").innerText = data.user_intellect
            document.getElementById("userVitality_stat").innerText = data.user_stamina
            document.getElementById("levelStrength_stat").innerText = data.level_strength
            document.getElementById("levelAgility_stat").innerText = data.level_agility
            document.getElementById("levelWinExp_stat").innerText = data.level_win_exp
            document.getElementById("levelLooseExp_stat").innerText = data.level_loose_exp
            document.getElementById("levelWinExpWot_stat").innerText = data.level_win_exp_wot
            document.getElementById("levelLooseExpWot_stat").innerText = data.level_loose_exp_wot
            document.getElementById("levelPoints_stat").innerText = data.level_points
            document.getElementById("levelIntellect_stat").innerText = data.level_intellect
            document.getElementById("levelStamina_stat").innerText = data.level_stamina
            document.getElementById("userDefence_stat").innerText = data.user_defence
            document.getElementById("searchValue_stat").innerText = data.search_value
            document.getElementById("levelSearchPool_stat").innerText = data.level_search_pool


            document.getElementById("head_stat").innerText = equip.head
            document.getElementById("torso_stat").innerText = equip.torso
            document.getElementById("leftHand_stat").innerText = equip.left_hand
            document.getElementById("rightHand_stat").innerText = equip.right_hand
            document.getElementById("hands_stat").innerText = equip.hands
            document.getElementById("legs_stat").innerText = equip.legs
            document.getElementById("feet_stat").innerText = equip.feet
            document.getElementById("throwingOption_stat").innerText = equip.throwing_option
            document.getElementById("ring1_stat").innerText = equip.ring_1
            document.getElementById("ring2_stat").innerText = equip.ring_2
            document.getElementById("amulet_stat").innerText = equip.amulet
            document.getElementById("cloak_stat").innerText = equip.cloak
            document.getElementById("artifact_stat").innerText = equip.artefact
            document.getElementById("quickItem_stat").innerText = equip.quick_item


            $.each(equip, function (index, element) {
                if (element != null && element != "") {
                    let item_data = element.split('_');
                    let image_id = item_data[0];
                    let specs_id = String(item_data[1]);
                    //воткнем каждому итему вызов модалки
                    console.log(index)
                    if (index != 'artefact') {
                        document.getElementById('main_char').innerHTML += '<img id="char_' + index + '" width="225" class="inventory-character__equip inventory-character__equip--' + index + '" src="img_inventory/inventory/' + image_id + '.png" alt="profile image"/>';
                        if (specs_id != "undefined") {
                            let post_item_info = JSON.stringify({
                                "state": "get_info",
                                "iig_id": specs_id,
                                "lang": language
                            });

                            $.ajax({
                                url: api_addr + '/items',
                                headers: {
                                    //'Auth': initdata,
                                    'Content-Type': 'application/json'
                                },
                                type: "POST",
                                data: post_item_info,
                                dataType: 'json',
                                success: function (data) {
                                    console.log('data items пришла')
                                    console.log(data)

                                    let item_info = data.item_info;

                                    let item_action_name = item_info.item_action;

                                    if (item_action_name == 'green') {
                                        style = green_style;
                                        icon_bg = green_style_icon;
                                        icon_bg_b = green_style_icon_b;
                                    }

                                    if (item_action_name == 'red') {
                                        style = red_style;
                                        icon_bg = red_style_icon;
                                        icon_bg_b = red_style_icon_b;
                                    }

                                    if (item_action_name == 'blue') {
                                        style = blue_style;
                                        icon_bg = blue_style_icon;
                                        icon_bg_b = blue_style_icon_b;
                                    }

                                }
                            });
                        }

                        //document.getElementById(index).innerHTML += "<img id=" + element + " onclick='openModal(\"" + element + "\", \"put_off\", \"" + language + "\")' width='61' height='61' src='img_inventory/inventory/" + image_id + "_inv.png' style='border-radius:10px'; alt='inventory item'>";
                    
                    } else {

                        //document.getElementById(index).innerHTML += "<img id=" + element + " onclick='openModal(\"" + element + "\", \"put_off\", \"" + language + "\")' width='61' height='61' src='img_inventory/inventory/" + image_id + "_inv.png' style='border-radius:10px'; alt='inventory item'>";
                    }
                }
            });

            let items = data.inv
            let grid = 1
            const inv_items = document.getElementById('inventory_items')
            console.log(items)
            $.each(items, function (index, element) {
                console.log(index, element)
                if (element != null && element != "") {
                    $.each(element, function (key, item) {
                        console.log(key, item)
                        let item_data = item.split('_');
                        let image_id = item_data[0];
                        if (item_data[1] != undefined) {
                            let post_item_info = JSON.stringify({
                                "state": "get_info",
                                "iig_id": String(item_data[1]),
                                "lang": language,
                            });
                            console.log(post_item_info)

                            $.ajax({
                                url: api_addr + '/items',
                                headers: {
                                    //'Auth': initdata,
                                    'Content-Type': 'application/json'
                                },
                                type: "POST",
                                data: post_item_info,
                                dataType: 'json',
                                success: function (data) {
                                    console.log(data)
                                    const inv_item = document.createElement('li')

                                    let li_class = ''
                                    //воткнем каждому итему вызов модалки
                                    li_class = 'js-item';
                                    inv_item.setAttribute('data-item-type', data.item_info.item_type)
                                    inv_item.classList.add(li_class)

                                    console.log(item)
                                    console.log(data.item_info.item_id)
                                    inv_item.innerHTML = `<img
                                        id="${item}"
                                        onclick="openModal('${item}', 'put_on', '${language}' )"
                                        src="img_inventory/inventory/${data.item_info.item_id}_inv.png"
                                        width="61"
                                        alt="item"
                                        style="border-radius:10px;" />`

                                    inv_items.prepend(inv_item);
                                    console.log(inv_item)
                                    
                                    generateEmptySlots()
                                }
                            });
                        } else {
                            let post_item_info_artefact = JSON.stringify({
                                "state": "get_info_artefact",
                                "ia_id": String(image_id)
                            });
                            console.log(post_item_info_artefact)
                            $.ajax({
                                url: api_addr + '/items',
                                headers: {
                                    //'Auth': initdata,
                                    'Content-Type': 'application/json'
                                },
                                type: "POST",
                                data: post_item_info_artefact,
                                dataType: 'json',
                                success: function (data) {
                                    console.log(data)
                                    const inv_item = document.createElement('li')

                                    let li_class = ''
                                    //воткнем каждому итему вызов модалки
                                    li_class = 'js-item';
                                    inv_item.setAttribute('data-item-type', 'Артефакты')
                                    inv_item.classList.add(li_class)

                                    console.log(item)
                                    inv_item.innerHTML = `<img
                                        id="${item}"
                                        onclick="openModal('${item}', 'put_on', '${language}')"
                                        src="img_inventory/inventory/${item}_inv.png"
                                        width="61"
                                        alt="item"
                                        style="border-radius:10px;" />`

                                    inv_items.prepend(inv_item);
                                    console.log(inv_item)

                                    generateEmptySlots()
                                }
                            });
                        }
                    });
                }
            });

            generateEmptySlots()

        }   
    });

    document.getElementById('btn_logs_fight').addEventListener('click', () => {
        const btn_logs_fight = document.getElementById('inp_logs_fight').value;
        console.log('запрос "Логи боев"');

        let logs_fight_data = btn_logs_fight.split(' - ');
        let logs_fight_from = logs_fight_data[0].split('-').reverse().join('-');
        let logs_fight_to = logs_fight_data[1].split('-').reverse().join('-');

        console.log(logs_fight_from);
        console.log(logs_fight_to);

        var settings = {
            "url": api_addr + '/user_check',
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
              "state": "fights_by_date",
              "from": "15-09-2023",
              "to": "01-10-2023"
            }),
        };
          
        $.ajax(settings).done(function (response) {
            console.log(response);
        });

        //...//

    });
    
    // Select groups
    const selected_el = document.querySelector('#inventory-select .catalog-select__value');

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "attributes") {
                console.log("attributes changed", selected_el)
                const current_type = selected_el.getAttribute('data-value')

                document.querySelectorAll('.js-item').forEach(item => {
                    const item_type = item.getAttribute('data-item-type')

                    if (current_type !== 'all') {
                        if (item_type !== current_type) {
                            item.classList.add('hidden')
                        } else {
                            item.classList.remove('hidden')
                        }
                    } else {
                        item.classList.remove('hidden')
                    }
                })

                generateEmptySlots()
            }
        });
    });

    observer.observe(selected_el, {
        attributes: true //configure it to listen to attribute changes
    });

})

//модалка
let modal = document.getElementById("item_modal");
let btn = document.getElementById("item_modal");
let span = document.getElementsByClassName("modal__close")[0];
let modal_overlay = document.getElementsByClassName("modal__overlay")[0];

function openModal(item_data, action, language) {
    let item = item_data.split('_');
    //specs_id = String(item[1]);
    
    (item[1] == undefined) ? (specs_id = String(item[0])) : (specs_id = String(item[1]));

    if (item[1] == undefined) {
        var post_item_info_artefact = JSON.stringify({
            "state": "get_info_artefact",
            "ia_id": specs_id
        });
    } else {
        var post_item_info = JSON.stringify({
            "state": "get_info",
            "iig_id": specs_id,
            "lang": language
        });
    }

    if (language == 'ru') {
        var equip_text = "Надеть";
        var unequip_text = "Cнять";
        var footer_caption = "Изменение характеристик при экипировке";
        var params_text = "Параметры";
    } else {
        var equip_text = "Equip";
        var unequip_text = "Remove";
        var footer_caption = "Changing stats";
        var params_text = "Params";
    }

    if (action !== 'put_off') {
        // if (action === 'put_off') {
        var button_text = equip_text;
    } else {
        var button_text = unequip_text;
    }

    if (item[1] == undefined) {
        $.ajax({
            url: api_addr + '/items',
            headers: {
                //'Auth': initdata,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: post_item_info_artefact,
            dataType: 'json',
            success: function (data) {
                let item_info_artefact = data.item_info_artefact;
                document.querySelector(".modal_item_name").textContent = "Тонолит";
                document.querySelector(".modal_item_description").textContent = item_info_artefact.item_description_ru;
                document.getElementById("modal_item_type").textContent = "Артефакт";
                document.getElementById("modal_item_rarity").textContent = item_info_artefact.item_rarity;
                document.getElementById("footer_caption").textContent = footer_caption;
                document.getElementById("params_text").textContent = params_text;
                document.getElementById("modal_item_params").innerHTML = "<li>" + item_info_artefact.item_action_description + "</li>";
                if (item_info_artefact.item_value > 0) {
                    plus = "+" + item_info_artefact.item_value + "";
                } else {
                    plus = '';
                }
                document.getElementById("modal_item_chars").innerHTML = "<li>" + item_info_artefact.item_action_value + " " + plus + "</li>"
                try {
                    document.getElementById("modal_item_button").textContent = button_text;
                    document.getElementById("modal_item_button").onclick = function () {
                        if (action === 'put_off') {
                            put_off(item_data, item_info_artefact.item_slot_id, language);
                        } else {
                            put_on(item_data, item_info_artefact.item_slot_id, language);
                        }
                    };
                } catch (e) {

                }
                document.getElementById("item_img").src = `img_inventory/inventory/${item_info_artefact.item_id}_mkt.png`;
                document.getElementById("item_modal").style.display = "block";

                document.getElementById("modal_item_footer_buttons_substitution").innerHTML = '';
                
            }
        });
    
    } else {
        $.ajax({
            url: api_addr + '/items',
            headers: {
                //'Auth': initdata,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: post_item_info,
            dataType: 'json',
            success: function (data) {
                let item_info = data.item_info;
                document.querySelector(".modal_item_name").textContent = item_info.item_name;
                document.querySelector(".modal_item_description").textContent = item_info.item_description;
                document.getElementById("modal_item_type").textContent = item_info.item_type;
                document.getElementById("modal_item_rarity").textContent = item_info.item_rarity;
                document.getElementById("footer_caption").textContent = footer_caption;
                document.getElementById("params_text").textContent = params_text;
                document.getElementById("modal_item_params").innerHTML = "<li>" + item_info.item_action_description + "</li>";
                if (item_info.item_value > 0) {
                    plus = "+" + item_info.item_value + "";
                } else {
                    plus = '';
                }
                document.getElementById("modal_item_chars").innerHTML = "<li>" + item_info.item_action_value + " " + plus + "</li>"
                try {
                    document.getElementById("modal_item_button").textContent = button_text;
                    document.getElementById("modal_item_button").onclick = function () {
                        if (action === 'put_off') {
                            put_off(item_data, item_info.item_slot_id, language);
                        } else {
                            put_on(item_data, item_info.item_slot_id, language);
                        }
                    };
                } catch (e) {

                }
                document.getElementById("item_img").src = `img_inventory/inventory/${item_info.item_id}_mkt.png`;
                document.getElementById("item_modal").style.display = "block";

                document.getElementById("modal_item_footer_buttons_substitution").innerHTML = `
                <button id="modal_item_button_sell" class="modal_item_button_sell btn btn--wide btn--green">
                    Продать
                </button>
                <button id="item_transfer_btn" class="modal_item_button_transfer btn btn--wide btn--primary">
                    Передать
                </button>
                `;
                
                // Item Transfer
                document.getElementById('item_transfer_btn').addEventListener('click', () => {
                    document.getElementById("item_modal").style.display = "none";
                    openTransferModal(item_info)
                })

                // Item sell
                document.getElementById('modal_item_button_sell').addEventListener('click', () => {
                    document.getElementById("item_modal").style.display = "none";
                    openSellModal(item_info)
                })
            }
        });
    }
        
}

function addEmptySlot() {
    const slot = document.createElement('li')

    slot.classList.add('inventory__body_slot')
    slot.classList.add('inventory__body_slot_border')

    document.querySelector('#inventory_items').appendChild(slot)
}

function removeEmptySlot() {
    document.querySelector('.inventory__body_slot').remove()
}

// генерит пустые ячейки в инвентаре
function generateEmptySlots() {
    const total_count = 20
    const slots_count = document.querySelectorAll('#inventory_items li:not(.hidden)').length
    console.log(slots_count)
    if (slots_count > total_count) {
        for (let i = 0; i < slots_count - total_count; i++) removeEmptySlot()
    } else {
        for (let i = 0; i < total_count - slots_count; i++) addEmptySlot()
    }
}
