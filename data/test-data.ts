export default class TestData{
    static makeAppointmentTestData(){
        return [
            { testId: "TC001", facility: "Tokyo CURA Healthcare Center", hcp: "Medicare", visitDt: "05/10/2026" },
            { testId: "TC002", facility: "Hongkong CURA Healthcare Center", hcp: "Medicaid", visitDt: "05/11/2026" },
            { testId: "TC003", facility: "Seoul CURA Healthcare Center", hcp: "None", visitDt: "05/12/2026" }
        ];
    }

    static apiUserCreatioonTestData(){
        return [
            {   name: "Alex",
                 job: "Thomas",
                 id: "1244",
             createdAt: "2026-11-15 T01:35:49.8766", }
         
        ];
    }
}