function SendNotification(options)
    SendNUIMessage({
        type = 'notification',
        options = options
    })
end

RegisterNetEvent("r_notify:SendNotification", function(options)
    SendNotification(options)
end)
