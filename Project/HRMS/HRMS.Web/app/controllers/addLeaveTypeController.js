﻿app.controller('addLeaveTypeCtrl', ['$scope', '$rootScope', '$location', '$http', 'localStorageService', 'leaveTypeService', 'userLeaveService', 'userService', function ($scope, $rootScope, $location, $http, localStorageService, leaveTypeService, userLeaveService, userService) {

    $scope.addLeaveTypeModel = {};
    $scope.addUserLeaveModel = [];
    $scope.count = 0;

    if (leaveTypeService.isLeaveTypeEditing == true) {

        $scope.heading_titleCase = "Edit LeaveType";
        $scope.heading_upperCase = "EDIT LEAVE TYPE";
        $scope.addLeaveTypeModel.LeaveTypeID = leaveTypeService.selectedLeaveType.LeaveTypeID;
        $scope.addLeaveTypeModel.Name = leaveTypeService.selectedLeaveType.Name;
        $scope.addLeaveTypeModel.Description = leaveTypeService.selectedLeaveType.Description;
        $scope.addLeaveTypeModel.PerAnnumLeave = leaveTypeService.selectedLeaveType.PerAnnumLeave;
        $scope.addLeaveTypeModel.IsActive = leaveTypeService.selectedLeaveType.IsActive;
        $scope.addLeaveTypeModel.CreatedBy = leaveTypeService.selectedLeaveType.CreatedBy;
        $scope.addLeaveTypeModel.CreatedDate = leaveTypeService.selectedLeaveType.CreatedDate;

        $scope.addOrEditLeaveType = function () {

            $scope.addLeaveTypeModel.UpdatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addLeaveTypeModel.UpdatedDate = new Date();

            leaveTypeService.updateLeaveType($scope.addLeaveTypeModel).then(function (response) {
                $scope.message = $scope.message + '-LeaveType edited-';
                $location.path('/leaveTypeList');
            }, function (error) {
                $scope.message = 'Error';
            })
        }
    } else {

        $scope.heading_titleCase = "Add LeaveType";
        $scope.heading_upperCase = "ADD LEAVE TYPE";

        $scope.addOrEditLeaveType = function () {

            /*
            
            // Reason - Old Code replaced by writing code on Api instead

            $scope.addLeaveTypeModel.CreatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addLeaveTypeModel.CreatedDate = new Date();
            $scope.addLeaveTypeModel.UpdatedBy = localStorageService.get('loggedInUser').UserID;
            $scope.addLeaveTypeModel.UpdatedDate = new Date();

            leaveTypeService.addLeaveType(model).then(function (response) {
                $scope.message = $scope.message + '-LeaveType added-';

                userService.getUser("?$filter=DateOfLeaving eq null").then(function (response) {
                    $scope.userModel = response.data.value;
                    angular.forEach($scope.userModel, function (value, key) {

                        $scope.addUserLeaveModel[key].NumberOfLeave = response.data.PerAnnumLeave;
                        $scope.addUserLeaveModel[key].LeaveTypeID = response.data.LeaveTypeID;
                        $scope.addUserLeaveModel[key].UserID = value.UserID;
                        $scope.count++;

                        userLeaveService.addUserLeave($scope.addUserLeaveModel[key]).then(function (response) {
                            $scope.message = $scope.message + '-Users Leaves added-';
                            if ($scope.count == $scope.userModel.length) {
                                $location.path('/leaveTypeList');
                            }
                        }, function (error) {
                            $scope.message = 'Error';
                        })

                    })
                }, function (error) {
                    $scope.message = 'Error';
                })
            */

            var model = {
                Name: $scope.addLeaveTypeModel.Name,
                Description: $scope.addLeaveTypeModel.Description,
                PerAnnumLeave: $scope.addLeaveTypeModel.PerAnnumLeave,
                IsActive: $scope.addLeaveTypeModel.IsActive,
                CreatedDate: new Date(),
                UpdatedBy: localStorageService.get('loggedInUser').UserID,
                UpdatedDate: new Date(),
                CreatedBy: localStorageService.get('loggedInUser').UserID

            }
            leaveTypeService.addLeaveTypeAllUser(model).then(function (response) {
                $location.path('/leaveTypeList');
            }, function (error) {
                $scope.message = 'Error';
            })
        }
    }
}]);
