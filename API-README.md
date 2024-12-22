# Routesure API Documentation

# Roles

## Add Role

-   **API**: `https://api-route-sure.vercel.app/api/role`
-   **Method**: POST
-   **Request**:

```json
{
	"name": "admin"
}
```

-   **Response**:
    ```json
    {
    	"message": "Success",
    	"data": {
    		"name": "admin",
    		"_id": "67683a50d1738a854ac6fd82",
    		"__v": 0
    	}
    }
    ```

# AuthUser

## Register

-   **name** : Register
-   **API**: `https://api-route-sure.vercel.app/api/register`
-   **Method**: POST
-   **Request** :

```json
{
	"name": "febrio",
	"email": "febriodwi14@gmail.com",
	"password": "febrio111",
	"confirmPassword": "febrio111"
}
```

-   **Response**:

    ```json
    {
    	"message": "Success",
    	"registerData": {
    		"name": "dwi",
    		"email": "dwi14@gmail.com",
    		"password": "$2b$10$4iBHhtkuEp3BcHBq9zAW1etOAnwlUAL9dZcrXCClwvZgJ1/3kjH1a",
    		"_id": "67683bc8d1738a854ac6fd93",
    		"role": "671b68433981db347cfd7834",
    		"__v": 0
    	}
    }
    ```

## Login

-   **name** : Login
-   **API** : `https://api-route-sure.vercel.app/api/login`
-   **Method**: POST
-   **Request**:

```json
{
	"email": "dwi14@gmail.com",
	"password": "dwi123"
}
```

-   **Response** :

```json
{
	"user": {
		"_id": "67683bc8d1738a854ac6fd93",
		"name": "dwi",
		"email": "dwi14@gmail.com",
		"role": "671b68433981db347cfd7834"
	}
}
```

## Logout

-   **name** : logout
-   **API** : `https://api-route-sure.vercel.app/api/logout`
-   **Method**: POST
-   **Request**: -
-   **Response**:

```json
{
	"message": "Log Out berhasil"
}
```

## Get All Users

-   **name** : getAllUser
-   **API** : `https://api-route-sure.vercel.app/api/get-user`
-   **Method** : POST
-   **Request** : -
-   **Response** :

```json
{
	"user": [
		{
			"_id": "675185fd16bb6db18ab3367a",
			"name": "Routesure",
			"email": "routesure1@gmail.com",
			"role": "671b672b3981db347cfd7832",
			"__v": 0
		}
	]
}
```

## Get Current User

-   **name** : getCurrentUser
-   **API** : `https://api-route-sure.vercel.app/api/get-user/:id`
-   **Method** : GET
-   **Request**: -
-   **Response** :

```json
{
	"user": {
		"_id": "67683bc8d1738a854ac6fd93",
		"name": "dwi",
		"email": "dwi14@gmail.com",
		"role": "671b68433981db347cfd7834",
		"__v": 0
	}
}
```

## ForgotPassword

-   **name** : ForgotPassword
-   **API**: `https://api-route-sure.vercel.app/api/forgotPassword`
-   **Method**: POST
-   **Request** :

```json
{
	"email": "febriodwi14@gmail.com"
}
```

-   **Response**:

```json
{
	"message": "Verifikasi Email telah dikirim!"
}
```

## ResetPassword

-   **name** : ResetPassword
-   **API**: `https://api-route-sure.vercel.app/api/resetPassword/:token`
-   **Method**: PUT
-   **Request** :

```json
{
	"password": "febrio123",
	"confirmPassword": "febrio123"
}
```

-   **Response** :

```json
{
	"message": "Password berhasil diubah, silakan login kembali"
}
```

# Laporan

## createLaporan

-   **name** : createLaporan
-   **Method** : POST
-   **API** : `https://api-route-sure.vercel.app/api/laporan`
-   **Request** : form-data [ name: String, email: String, deskripsi:
    String,image: File]
-   **Response** :

```json
{
	"status": "success",
	"message": "Terima Kasih atas laporan Anda. Laporan Anda sedang dalam proses",
	"data": {
		"name": "udin",
		"email": "udin@gmail.com",
		"position": {
			"latitude": -6.436239872829091,
			"longitude": 106.7774681561636
		},
		"status": "Proses",
		"deskripsi": "jalan rusak parah",
		"image": "https://res.cloudinary.com/dq0baj7jw/image/upload/v1734888356/uploads/tdafgssmwhlegrn8b4op.jpg",
		"_id": "67684babf72866bcbcd90722",
		"createdAt": "2024-12-22T17:26:03.227Z",
		"updatedAt": "2024-12-22T17:26:03.227Z",
		"__v": 0
	}
}
```

## getLaporan

-   **name** : GetLaporan
-   **Method** : GET
-   **API** : `https://api-route-sure.vercel.app/api/laporan`
-   **Request** : -
-   **Response** :

```json
{
	"status": "success",
	"data": [
		{
			"position": {
				"latitude": -6.436239872829091,
				"longitude": 106.7774681561636
			},
			"_id": "6752d1376a7c4f1f215033af",
			"name": "RouteSure",
			"email": "routsure14@gmail.com",
			"status": "Selesai",
			"deskripsi": "jalan rusak",
			"image": "https://res.cloudinary.com/dw4vw76tl/image/upload/v1733480758/uploads/xsovagpxdvayhgnezv4r.jpg",
			"createdAt": "2024-12-06T10:25:59.342Z",
			"updatedAt": "2024-12-18T12:00:11.626Z",
			"__v": 0
		}
	]
}
```

## updateStatusLaporan

-   **name** : updateStatusLaporan
-   **Method** : PUT
-   **API** :`https://api-route-sure.vercel.app/api/laporan/:id`
-   **Request** :

```json
{
	"status": "Selesai"
}
```

-   **Response** :

```json
{
	"message": "Status laporan berhasil diupdate"
}
```

## deleteLaporan

-   **name** : deleteLaporan
-   **Method** : DELETE
-   **API** :`https://api-route-sure.vercel.app/api/laporan/:id`
-   **Request** : -
-   **Response** :

```json
{
	"message": "Laporan berhasil dihapus"
}
```

## detailLaporan

-   **name** : detailLaporan
-   **Method** : GET
-   **API** :`https://api-route-sure.vercel.app/api/laporan/:id`
-   **Request** : -
-   **Response** :

```json
{
	"detailLaporan": {
		"position": {
			"latitude": -6.436239872829091,
			"longitude": 106.7774681561636
		},
		"_id": "6752d1376a7c4f1f215033af",
		"name": "RouteSure",
		"email": "routsure14@gmail.com",
		"status": "Selesai",
		"deskripsi": "jalan rusak",
		"image": "https://res.cloudinary.com/dw4vw76tl/image/upload/v1733480758/uploads/xsovagpxdvayhgnezv4r.jpg",
		"createdAt": "2024-12-06T10:25:59.342Z",
		"updatedAt": "2024-12-18T12:00:11.626Z",
		"__v": 0
	}
}
```
