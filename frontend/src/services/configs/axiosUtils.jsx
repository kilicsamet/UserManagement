export function defineCancelApiObject(apiObject) {
    // Bu değişken, apiObject API objesindeki her API özelliği adına atanan bir iptal işleyicisi içerecektir.
    const cancelApiObject = {}

    // apiObject API katmanı nesnesindeki her özellik, bir API çağrısını tanımlayan bir işlevle ilişkilendirilir.

    // Bu döngü, her bir API özelliği adı üzerinde döner.
    Object.getOwnPropertyNames(apiObject).forEach((apiPropertyName) => {
        const cancellationControllerObject = {
            controller: undefined,
        }

        // API özelliği adıyla istek iptal işleyicisini ilişkilendirme
        cancelApiObject[apiPropertyName] = {
            handleRequestCancellation: () => {
                // eğer kontrolör zaten mevcutsa, isteği iptal ediyoruz.
                if (cancellationControllerObject.controller) {
                   // İstek zaten varsa, isteği iptal ediyor ve bu özel mesajı döndürüyor.
                    cancellationControllerObject.controller.abort()
                }

                // AbortController fabrikası ile yeni bir denetleyici oluşturuluyor
                cancellationControllerObject.controller = new AbortController()

                return cancellationControllerObject.controller
            },
        }
    })

    return cancelApiObject
}    