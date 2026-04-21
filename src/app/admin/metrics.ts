import { supabase } from '@/lib/supabase';

export async function getAdminMetrics() {
  try {
    const { count: totalCustomers, error } = await supabase
    .from('customer_details')
    .select('*', { count: 'exact', head: true });

    if (error) {
      return {
        totalCustomers: 0,
        newCustomersThisMonth: 0,
        completedMemberships: 0,
        uncompletedMemberships: 0,
        enquiriesThisMonth: 0,
      };
    }

    // Get customers registered this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const { data: newCustomersData, error: newCustomersError } = await supabase
      .from('customer_details')
      .select('*')
      .gte('created_at', startOfMonth.toISOString());
    
    // Get completed memberships
    const { data: completedMembershipsData, error: completedMembershipsError } = await supabase
      .from('membership_details')
      .select('*')
      .eq('status', true);
    
    // Get uncompleted memberships
    const { data: uncompletedMembershipsData, error: uncompletedMembershipsError } = await supabase
      .from('membership_details')
      .select('*')
      .eq('status', false);
    
    // Get enquiries this month
    const { data: enquiriesData, error: enquiriesError } = await supabase
      .from('membership_details')
      .select('*')
      .gte('created_at', startOfMonth.toISOString());
    
    const metrics = {
      totalCustomers: totalCustomers || 0,
      newCustomersThisMonth: newCustomersData?.length || 0,
      completedMemberships: completedMembershipsData?.length || 0,
      uncompletedMemberships: uncompletedMembershipsData?.length || 0,
      enquiriesThisMonth: enquiriesData?.length || 0,
    };

    return metrics;
  } catch (error) {
    return {
      totalCustomers: 0,
      newCustomersThisMonth: 0,
      completedMemberships: 0,
      uncompletedMemberships: 0,
      enquiriesThisMonth: 0,
    };
  }
} 