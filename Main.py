from Users import Users

renter1 = Users('Jermaine beatRIZ', 'ConfESor', 'F', 'Renter1218', '09175489771', 'renter', '0001')

renter1.logIn('Jermaine Beatriz', 'WrongPass')
print()
renter1.logIn('Jermaine Beatriz Confesor', 'Renter1218')
print()
renter1.display_user_info()
print()
renter1.logOut()